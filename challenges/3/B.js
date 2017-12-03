const surrounding = [
  [-1, -1], [-1, 0], [-1, 1],
  [0,  -1], [0,  0], [0,  1],
  [1,  -1], [1,  0], [1,  1],
];

const getSurrounding = (map, [pX, pY]) => surrounding
  .map(([x, y]) => ~~((map[pX + x] = map[pX + x] || [])[pY + y] = map[pX + x][pY + y] || []))
  .filter(Boolean);

module.exports = (input) => {
  const map = [[null, 2], [1, 1]];
  let pos = [0, 1];
  let dir = [0, -1];
  while(map[pos[0]][pos[1]] < input) {
    pos = pos.map((p, i) => p + dir[i]);
    dir = getSurrounding(map, pos).length < 3 ? [-dir[1], dir[0]] : dir;
    map[pos[0]][pos[1]] = getSurrounding(map, pos).reduce((s, c) => s + c);
  }
  return map[pos[0]][pos[1]];
}
