const app = require('../../app.js');
const request = require('supertest');

describe("/new", () => {
  it("should add a new player to the database", async () => {
    const body = {
      first_name: 'New',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: 642726000
    }
    const response = await request(app)
      .post('/players/new')
      .send(body)
      .set('Accept', 'application/json')
    expect(response.body).toEqual({
      id: 1,
      first_name: 'New',
      last_name: 'Guy',
      nationality: 'Germany',
      dob: 642726000,
      score: 1200
    })
  })
})

