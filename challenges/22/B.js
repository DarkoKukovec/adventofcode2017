function check(position, map) {
  return position[0] in map && map[position[0]][position[1]];
}

function move(position, from, to) {
  if (from) {
    from[position[0]][position[1]] = false;
  }
  if (to) {
    to[position[0]] = to[position[0]] || [];
    to[position[0]][position[1]] = true;
  }
}

module.exports = (input) => {
  const rawMap = input.trim().split('\n').map((line, y) => line.split(''));
  const infected = []
  rawMap.map((line, y) => line.map((item, x) => {
    if (item === '#') {
      infected[x] = infected[x] || [];
      infected[x][y] = true;
    }
  }));
  const position = [Math.floor(rawMap[0].length / 2), Math.floor(rawMap.length / 2)];
  let dir = [0, -1];
  let infections = 0;
  const weakened = [];
  const flagged = [];

  for (let step = 0; step < 10000000; step++) {
    if (check(position, infected)) {
      dir = [-dir[1], dir[0]];
      move(position, infected, flagged);
    } else if (check(position, weakened)) {
      infections++;
      move(position, weakened, infected);
    } else if (check(position, flagged)) {
      dir = [-dir[0], -dir[1]];
      move(position, flagged, null);
    } else {
      dir = [dir[1], -dir[0]];
      move(position, null, weakened);
    }
    position[0] += dir[0];
    position[1] += dir[1];
  }

  return infections;
}
