module.exports = (input) => input
  .split('')
  .map(Number)
  .reduce((sum, item, index, arr) => (item === arr[(index + 1) % arr.length]) ? sum + item : sum, 0);
