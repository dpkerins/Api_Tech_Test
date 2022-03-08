const app = require('../app.js');
const request = require('supertest');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const calcNewScores = require('../calcNewScores.js');

describe("/players", () => {
  beforeAll(() => {
    const dob = new Date(1990, 5, 14)
    const newPlayers = [{
      id: 1,
      first_name: 'New',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: dob,
      score: 1100,
      rank: "Bronze"
    },
      {
      id: 2,
      first_name: 'Another',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 1500,
      rank: "Bronze"
    },
    {
      first_name: 'Third',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 1300,
      rank: "Unranked"
    },
    {
      first_name: 'Fourth',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 1700,
      rank: "Unranked"
    }
    ];
    newPlayers.forEach(async (player) => {
      await prisma.player.create({
        data: player
      })
    })
  });
  afterAll(async () => {
    await prisma.match.deleteMany({});
    await prisma.player.deleteMany({});
  });
  const dob = new Date(1990, 5, 14);
  const body = {
    first_name: 'First',
    last_name: 'Guy',
    nationality: 'Germany',
    dob: dob
  }
  it("should add a new player to the database", async () => {
    const response = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    expect(response.body.first_name).toEqual("First");
    expect(response.body.last_name).toEqual("Guy");
    expect(response.body.score).toEqual(1200);
    expect(response.body.dob).toEqual("1990-06-13T23:00:00.000Z");
    expect(response.body.nationality).toEqual("Germany");
    expect(response.body.rank).toEqual("Unranked");
  })

  it("should not allow duplicate player (same first and last name)", async () => {
    const response = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    const responseDuplicate = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    expect(responseDuplicate.body).toEqual("Cannot enter a new player with the same first and last names of an existing player");
  })

  it("should not allow player younger than 16 to be added", async () => {
    const dobYoung = new Date(2021, 11, 25);
    const newBody = {
      first_name: 'Young',
      last_name: 'Person',
      nationality: 'South Africa',
      dob: dobYoung
    }
    const responseDuplicate = await request(app)
      .post('/players/new')
      .send(newBody)
      .set('Accept', 'application/json')
    expect(responseDuplicate.body).toEqual("Cannot enter a new player younger than 16");
  })

  it("should return all players", async () => {
    const response = await request(app)
      .get('/players/')
    expect(response.body.length).toEqual(5);
  })
  it("should return all players in descending point order", async () => {
    const response = await request(app)
      .get('/players/')
    expect(response.body[0].score).toEqual(1500);
  })
  it("should return all players in descending point order with unranked at end", async () => {
    const response = await request(app)
      .get('/players/')
    expect(response.body[0].score).toEqual(1500);
    expect(response.body[response.body.length - 1].score).toEqual(1200);
  })

  it("should return all players with specific rank", async () => {
    const response = await request(app)
      .get('/players/Bronze')
    expect(response.body.length).toEqual(2);
  })
  
  it("should add a new match", async () => {
    const body = {
      winnerId: 2,
      loserId: 1
    }
    const matchResponse = await request(app)
      .post('/matches/new')
      .send(body)
      .set('Accept', 'application/json')
    const winnerResponse = await prisma.player.findUnique({
      where: {
        id: 2
      },
      include: {
        winners: true
      }
    })
    const loserResponse = await prisma.player.findUnique({
      where: {
        id: 1
      },
      include: {
        losers: true
      }
    })
    expect(winnerResponse.score).toEqual(1610);
    expect(winnerResponse.winners.length).toEqual(1);
    expect(loserResponse.score).toEqual(990);
    expect(loserResponse.losers.length).toEqual(1);
    expect(matchResponse.body.winnerId).toEqual(2);
  })
})

describe('calcNewScores()', () => {
  it("should return ten percent of loser's previous score", () => {
    const loserPoints = 900;
    expect(calcNewScores(loserPoints)).toEqual(90);
  })
})

