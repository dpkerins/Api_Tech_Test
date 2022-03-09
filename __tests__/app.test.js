const app = require('../app');
const request = require('supertest');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const calcNewScores = require('../helpers/calcNewScores');
const calcNewRank = require('../helpers/calcNewRank');

describe("routes", () => {
  it("should return all players", async () => {
    const deleteMatches = await prisma.match.deleteMany({});
    const deletePlayers = await prisma.player.deleteMany({});
    const dob = new Date(1990, 5, 14)
    let newPlayers = [{
      id: 1,
      first_name: 'New',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: dob,
      score: 1100,
      rank: "Unranked"
    },
      {
      id: 2,
      first_name: 'Another',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 1500,
      rank: "Unranked", 
      losers: {
        create: [
          { winnerId: 1},
          {winnerId: 1}
      ]}
    },
    {
      first_name: 'Third',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 900,
      rank: "Bronze"
    },
    {
      first_name: 'Fourth',
      last_name: 'Guy',
      nationality: 'China',
      dob: dob,
      score: 1200,
      rank: "Bronze"
    }
    ];
    let newPlayer = await prisma.player.create({
      data: newPlayers[0]
    })
    newPlayer = await prisma.player.create({
      data: newPlayers[1]
    })
    newPlayer = await prisma.player.create({
      data: newPlayers[2]
    })
    newPlayer = await prisma.player.create({
      data: newPlayers[3]
    })
    const response = await request(app)
      .get('/players/')
    expect(response.body.length).toEqual(4);
  })
  it("should return all players in descending point order", async () => {
    const response = await request(app)
      .get('/players/')
    expect(response.body[0].score).toEqual(1200);
  })
  it("should return all players in descending point order with unranked at end", async () => {
    const response = await request(app)
      .get('/players/')
    expect(response.body[0].score).toEqual(1200);
    expect(response.body[response.body.length - 1].score).toEqual(1100);
  })

  it("should return all players with specific rank", async () => {
    const response = await request(app)
      .get('/players/Bronze')
    expect(response.body.length).toEqual(2);
  })

  it("should add a new player to the database", async () => {
    const dob = new Date(1990, 5, 14);
    const body = {
      first_name: 'First',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: dob
    }
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
    const dob = new Date(1990, 5, 14);
    const body = {
      first_name: 'First',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: dob
    }
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
    expect(winnerResponse.rank).toEqual("Bronze");
    expect(loserResponse.score).toEqual(990);
    expect(loserResponse.losers.length).toEqual(1);
    expect(matchResponse.body.winnerId).toEqual(2);
  })
})

describe('calcNewScores()', () => {
  it("should return ten percent of loser's previous score", () => {
    const loser = { score: 900 };
    const winner = {score: 1200};
    expect(calcNewScores(winner, loser)).toEqual({
      winnerPoints: 1290,
      loserPoints: 810
    });
  })
})

describe('calcNewRank()', () => {
  it("should return a player's new rank when they have played 3 matches", () => {
    const player = {
      score: 1100,
      winners: [{}, {}, {}],
      losers: []
    }
    const points = 100;
    expect(calcNewRank(player, points)).toEqual("Bronze");
  })
  it("should return Unranked if player has played less than 3 matches", () => {
    const player = {
      score: 1100,
      winners: [{}, {}],
      losers: []
    }
    const points = 100;
    expect(calcNewRank(player, points)).toEqual("Unranked");
  })
  it("should return players new rank if they gain enough points", () => {
    const player = {
      score: 4500,
      winners: [{}, {}, {}],
      losers: []
    }
    const points = 5100;
    expect(calcNewRank(player, points)).toEqual("Gold");
  })
  it("should return players new rank if they lose enough points", () => {
    const player = {
      score: 3000,
      winners: [{}, {}, {}],
      losers: []
    }
    const points = 2500;
    expect(calcNewRank(player, points)).toEqual("Bronze");
  })
})

