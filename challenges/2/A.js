module.exports = (input) => input
  .split('\n')
  .map((row) => Math.max(...row.split(/\s+/)) - Math.min(...row.split(/\s+/)))
  .reduce((sum, curr) => sum + curr);
