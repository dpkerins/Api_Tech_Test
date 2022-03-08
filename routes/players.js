var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
  try {
    const allPlayers = await prisma.player.findMany();
    const sortedPlayers = allPlayers.sort((a, b) => {
      if (a.rank != b.rank && a.rank == "Unranked") { return 1 };
      if (a.rank != b.rank && b.rank == "Unranked") { return -1 };
      return b.score - a.score;
    })
    res.json(sortedPlayers);
  } catch (e) {
    res.json(e);
  }
  
});

router.get('/:rank', async (req, res) => {
  try {
    const allPlayers = await prisma.player.findMany({
      where: {
        rank: req.params.rank
      }
    });
    const sortedPlayers = allPlayers.sort((a, b) => {
      if (a.rank != b.rank && a.rank == "Unranked") { return 1 };
      if (a.rank != b.rank && b.rank == "Unranked") { return -1 };
      return b.score - a.score;
    })
    res.json(sortedPlayers);
  } catch (e) {
    res.json(e);
  }
});


router.post('/new', async (req, res) => {
  const body = req.body;
  const birthDate = new Date(body.dob);
  const today = new Date();
  const sixteenYearsAgo = new Date(today.getYear() + 1900 - 16, today.getMonth(), today.getDay());
  if ((sixteenYearsAgo - birthDate) < 0) {return res.json("Cannot enter a new player younger than 16") }
  try {
    const data = {
      first_name: body.first_name,
      last_name: body.last_name,
      nationality: body.nationality,
      dob: body.dob,
      score: 1200,
      rank: "Unranked"
    }
    const newPlayer = await prisma.player.create({
      data: data
    });
    res.json(newPlayer);
  } catch (e) {
    if (e.code == 'P2002') {return res.json("Cannot enter a new player with the same first and last names of an existing player")}
  }
  
})

module.exports = router;
