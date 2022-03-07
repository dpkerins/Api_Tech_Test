var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/new', async (req, res) => {
  const data = req.body;
  const newMatch = await prisma.match.create({
    data: data
  })
  res.json(newMatch);
})


module.exports = router;