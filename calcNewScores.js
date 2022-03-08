const calcNewScores = (winner, loser) => {
  const transfer = parseInt(loser.score / 10);
  return {
    winnerPoints: winner.score + transfer,
    loserPoints: loser.score - transfer
  }
}

module.exports = calcNewScores;