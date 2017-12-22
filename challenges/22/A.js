module.exports = (input) => {
  const rawMap = input.trim().split('\n').map((line, y) => line.split(''));
  const map = [].concat(...rawMap
    .map((line, y) => line
      .reduce((infected, item, x) => item === '#' ? infected.concat([`${x},${y}`]) : infected, [])
    ));
  const position = [Math.floor(rawMap[0].length / 2), Math.floor(rawMap.length / 2)];
  let dir = [0, -1];
  let infected = 0;

  for (let step = 0; step < 10000; step++) {
    const coord = `${position[0]},${position[1]}`;
    if (map.indexOf(coord) !== -1) {
      dir = [-dir[1], dir[0]];
      const coordIndex = map.indexOf(coord);
      map.splice(coordIndex, 1);
    } else {
      dir = [dir[1], -dir[0]];
      infected++;
      map.push(coord);
    }
    position[0] += dir[0];
    position[1] += dir[1];
  }

  return infected;
}
