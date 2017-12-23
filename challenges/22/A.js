module.exports = (input) => {
  const rawMap = input.trim().split('\n').map((line, y) => line.split(''));
  const infected = {}
  rawMap.map((line, y) => line.map((item, x) => {
    infected[`${x},${y}`] = item === '#';
  }));
  const position = [Math.floor(rawMap[0].length / 2), Math.floor(rawMap.length / 2)];
  let dir = [0, -1];
  let infectedCount = 0;

  for (let step = 0; step < 10000; step++) {
    const pos = position.join(',');
    if (infected[pos]) {
      dir = [-dir[1], dir[0]];
      infected[pos] = false;
    } else {
      dir = [dir[1], -dir[0]];
      infectedCount++;
      infected[pos] = true;
    }
    position[0] += dir[0];
    position[1] += dir[1];
  }

  return infectedCount;
}
