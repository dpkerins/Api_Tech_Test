var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
  const allPlayers = await prisma.player.findMany();
  res.json(allPlayers);
});

router.post('/new', async (req, res) => {
  const body = req.body;
  const birthDate = new Date(body.dob);
  const today = new Date();
  const sixteenYearsAgo = new Date(today.getYear() + 1900 - 16, today.getMonth(), today.getDay());
  const user = await prisma.player.findFirst({
    where: { first_name: body.first_name, last_name: body.last_name },
  })
  try {
    if ((sixteenYearsAgo - birthDate) < 0) {throw "Cannot enter a new player younger than 16" }
    if (user) { throw "Cannot enter a new player with the same first and last names of an existing player" }
    const data = {
      first_name: body.first_name,
      last_name: body.last_name,
      nationality: body.nationality,
      dob: body.dob,
      score: 1200
    }
    const newPlayer = await prisma.player.create({
      data: data
    });
    res.json(newPlayer);
  } catch (e) {
    res.json(e);
  }
  
})

module.exports = router;
