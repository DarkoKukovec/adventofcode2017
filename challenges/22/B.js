module.exports = (input) => {
  const rawMap = input.trim().split('\n').map((line, y) => line.split(''));
  const map = {}
  rawMap.map((line, y) => line.map((item, x) => {
    map[`${x},${y}`] = item === '#' ? 2 : 0;
  }));

  const position = [Math.floor(rawMap[0].length / 2), Math.floor(rawMap.length / 2)];
  let dir = 0;
  let infections = 0;
  const weakened = {};
  const flagged = {};

  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]

  const dirChange = [3, 0, 1, 2];

  for (let step = 0; step < 10000000; step++) {
    const pos = position[0] + ',' + position[1];
    const state = map[pos] || 0;
    if (state === 1) {
      infections++;
    }
    dir = (dir + dirChange[state]) % 4;
    map[pos] = (state + 1) % 4;
    position[0] += dirs[dir][0];
    position[1] += dirs[dir][1];
  }

  return infections;
}
