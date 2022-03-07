var express = require('express');
var router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', async (req, res) => {
  const body = req.body;
  const user = await prisma.player.findFirst({
    where: { first_name: body.first_name, last_name: body.last_name },
  })
  try {
    if (user == null) {
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
    } else {
      throw ("Cannot enter a new player with the same first and last names of an existing player");
    }
  } catch (e) {
    res.json(e);
  }
  
})

module.exports = router;
