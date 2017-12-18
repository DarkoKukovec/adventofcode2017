const getHash = require('../10/B');

module.exports = (input) => {
  let filled = 0;
  for (let row = 0; row < 128; row++) {
    filled += getHash(input + '-' + row)
      .split('')
      .map((digit) => ~~digit)
      .map((digit) => digit.toString(2).padStart(4, '0'))
      .join('')
      .split('')
      .filter((digit) => digit === '1')
      .length;
  }
  return filled;
}