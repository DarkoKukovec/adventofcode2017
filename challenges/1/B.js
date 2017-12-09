module.exports = (input) => input
  .split('')
  .map(Number)
  .reduce((sum, item, index, arr) => (item === arr[(index + arr.length / 2) % arr.length]) ? sum + item : sum, 0);
