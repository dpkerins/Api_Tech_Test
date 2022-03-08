var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const calcNewScores = require('../calcNewScores.js');
const calcNewRank = require('../calcNewRank');

router.post('/new', async (req, res) => {
  const data = req.body;
  const newMatch = await prisma.match.create({
    data: data
  })
  const loser = await prisma.player.findUnique({ where: { id: data.loserId }, include: { winners: true, losers: true } });
  const winner = await prisma.player.findUnique({ where: { id: data.winnerId }, include: { winners: true, losers: true } });
  const newScores = calcNewScores(winner, loser);
  const updateWinner = await prisma.player.update({
    where: {
      id: data.winnerId
    },
    data: {
      score: newScores.winnerPoints,
      rank: calcNewRank(winner, newScores.winnerPoints)
    }
  })
  const updateLoser = await prisma.player.update({
    where: {
      id: data.loserId
    }, 
    data: {
      score: newScores.loserPoints,
      rank: calcNewRank(loser, newScores.loserPoints)
    }
  })
  res.json(newMatch);
})


module.exports = router;