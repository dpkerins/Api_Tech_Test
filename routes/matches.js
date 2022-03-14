var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const calcNewScores = require('../helpers/calcNewScores.js');
const calcNewRank = require('../helpers/calcNewRank');

router.post('/new', async (req, res) => {
  try { 
    const data = req.body;
    const newMatch = await prisma.match.create({
      data: {
        winnerId: parseInt(data.winnerId),
        loserId: parseInt(data.loserId)
      }
    })
    const loser = await prisma.player.findUnique({ where: { id: newMatch.loserId }, include: { winners: true, losers: true } });
    const winner = await prisma.player.findUnique({ where: { id: newMatch.winnerId }, include: { winners: true, losers: true } });
    const newScores = calcNewScores(winner, loser);
    const updateWinner = await prisma.player.update({
      where: {
        id: newMatch.winnerId
      },
      data: {
        score: newScores.winnerPoints,
        rank: calcNewRank(winner, newScores.winnerPoints)
      }, include: {
        winners: true,
        losers: true
      }
    })
    const updateLoser = await prisma.player.update({
      where: {
        id: newMatch.loserId
      }, 
      data: {
        score: newScores.loserPoints,
        rank: calcNewRank(loser, newScores.loserPoints)
      }, include: {
        winners: true,
        losers: true
      }
    })
    newMatch.winner = updateWinner;
    newMatch.loser = updateLoser;
    res.json(newMatch);
  } catch (e) {
    res.json(e)
  }
})


module.exports = router;