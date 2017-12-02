module.exports = (input) => input
  .split('\n')
  .map((row) => row
    .split(/\s+/)
    .map(Number)
    .reduce(
      (div, curr, index, arr) => Math.max(div, ...arr
        .map((curr2, index2) => index2 !== index && curr % curr2 === 0 ? curr / curr2 : 0)
    ), 0)
  )
  .reduce((sum, curr) => sum + curr);