const calcNewRank = (player, points) => {
  const matches = player.winners.length + player.losers.length;
  if (matches < 3) { return 'Unranked' }
  if (points < 3000) { return 'Bronze' }
  if (points < 5000) { return 'Silver' }
  if (points < 10000) { return 'Gold' }
  return 'Supersonic Legend';
}

module.exports = calcNewRank;


