module.exports = (input) => input
  .split('\n')
  .map((row) => Math.max(...row.split(/\s+/).map(Number)) - Math.min(...row.split(/\s+/).map(Number)))
  .reduce((sum, curr) => sum + curr);
