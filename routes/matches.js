var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const calcNewScores = require('../calcNewScores.js');

router.post('/new', async (req, res) => {
  const data = req.body;
  const newMatch = await prisma.match.create({
    data: data
  })
  const oldLoserScore = (await prisma.player.findUnique({ where: { id: data.loserId } })).score 
  const transferAmount = calcNewScores(oldLoserScore);
  const newWinnerScore = await prisma.player.update({
    where: {
      id: data.winnerId
    }, 
    data: {
      score: {increment: transferAmount}
    }
  })
  const newLoserScore = await prisma.player.update({
    where: {
      id: data.loserId
    }, 
    data: {
      score: {decrement: transferAmount}
    }
  })
  res.json(newMatch);
})


module.exports = router;