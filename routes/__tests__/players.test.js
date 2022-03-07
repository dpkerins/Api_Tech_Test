const app = require('../../app.js');
const request = require('supertest');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

describe("/new", () => {
  beforeEach(async () => {
    await prisma.player.deleteMany({})
  })
  const dob = new Date(1990, 5, 14)
  const body = {
    first_name: 'New',
    last_name: 'Guy',
    nationality: 'Germany',
    dob: dob.toISOString()
  }
  it("should add a new player to the database", async () => {
    const response = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    expect(response.body.first_name).toEqual("New");
    expect(response.body.last_name).toEqual("Guy");
    expect(response.body.score).toEqual(1200);
    expect(response.body.dob).toEqual("1990-06-13T23:00:00.000Z");
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

  // it("should not allow player younger than 16 to be added", async () => {

  // })
})

