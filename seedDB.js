const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const seedDB =() => {
  const dob = new Date(1990, 5, 14)
  const newPlayers = [{
    id: 1,
    first_name: 'New',
    last_name: 'Guy',
    nationality: 'Germany',
    dob: dob,
    score: 1100,
    rank: "Unranked"
  },
    {
    id: 2,
    first_name: 'Another',
    last_name: 'Guy',
    nationality: 'China',
    dob: dob,
    score: 1500,
    rank: "Unranked", 
    losers: {
      create: [
        { winnerId: 1},
        {winnerId: 1}
    ]}
  },
  {
    first_name: 'Third',
    last_name: 'Guy',
    nationality: 'China',
    dob: dob,
    score: 900,
    rank: "Bronze"
  },
  {
    first_name: 'Fourth',
    last_name: 'Guy',
    nationality: 'China',
    dob: dob,
    score: 1200,
    rank: "Bronze"
  }
  ];
  newPlayers.forEach(async (player) => {
    await prisma.player.create({
      data: player
    })
  })
}

module.exports = seedDB;