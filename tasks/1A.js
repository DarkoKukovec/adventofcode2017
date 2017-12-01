const {loadData} = require('../helpers');

console.log(
  loadData(1)
    .split('')
    .map(Number)
    .reduce((sum, item, index, arr) => (item === arr[(index + 1) % arr.length]) ? sum + item : sum, 0)
);
