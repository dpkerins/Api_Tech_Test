const calcAge = (dob) => {
  const birth = new Date(dob).valueOf();
  const today = Date.now();
  const age = Math.floor((today - birth) / (365 * 24 * 60 * 60 * 1000));
  return age;
};

module.exports = calcAge;