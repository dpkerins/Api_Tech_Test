const calcNewRank = (player, points) => {
  const matches = player.matches.length;
  const newScore = points + player.score;
  if (matches < 2) { return 'Unranked' }
  if (newScore < 3000) { return 'Bronze' }
  if (newScore < 5000) { return 'Silver' }
  if (newScore < 10000) { return 'Gold' }
  return 'Supersonic Legend';
}

module.exports = calcNewRank;


