const surr = [
  [-1, -1], [-1, 0], [-1, 1],
  [0,  -1], [0,  0], [0,  1],
  [1,  -1], [1,  0], [1,  1],
];

const getSurrounding = (map, [pX, pY]) => surr.map(([x, y]) => map[`${pX + x},${pY + y}`]).filter(Boolean);

module.exports = (input) => {
  const map = {'0,0': 1, '1,0': 1, '1,1': 2};
  let pos = [1, 1];
  let dir = [-1, 0];
  while(map[pos] < input) {
    pos = pos.map((p, i) => p + dir[i]);
    dir = getSurrounding(map, pos).length < 3 ? [-dir[1], dir[0]] : dir;
    map[pos] = getSurrounding(map, pos).reduce((s, c) => s + c);
  }
  return map[pos];
}
