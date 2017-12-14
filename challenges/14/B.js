const getHash = require('../10/B');

function fillRegion(rows, x, y, num) {
  if (x in rows && y in rows[x] && rows[x][y] === true) {
    rows[x][y] = num;
    fillRegion(rows, x + 1, y, num);
    fillRegion(rows, x - 1, y, num);
    fillRegion(rows, x, y + 1, num);
    fillRegion(rows, x, y - 1, num);
  }
}

module.exports = (input) => {
  let nextRegion = 1;
  const rows = [];
  for (let row = 0; row < 128; row++) {
    rows.push(
      getHash(input + '-' + row)
        .split('')
        .map((digit) => parseInt(digit, 16))
        .map((digit) => digit.toString(2).padStart(4, '0'))
        .join('')
        .split('')
        .map((digit) => digit === '1')
    );
  }

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      if (rows[x][y] === true) {
        fillRegion(rows, x, y, nextRegion++);
      }
    }
  }

  return nextRegion - 1;
}