const app = require('../../app.js');
const request = require('supertest');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

describe("/new", () => {
  beforeEach(async () => {
    await prisma.player.deleteMany({})
  })
  const body = {
    first_name: 'New',
    last_name: 'Guy',
    nationality: 'Germany',
    dob: 642726000
  }
  it("should add a new player to the database", async () => {
    const response = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    expect(response.body.first_name).toEqual("New");
    expect(response.body.last_name).toEqual("Guy");
    expect(response.body.score).toEqual(1200);
    expect(response.body.nationality).toEqual("Germany");
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
})

