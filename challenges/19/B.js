module.exports = (input) => {
  const field = input
    .split('\n')
    .map((line) => line.split('').map((pos) => pos.trim()));
  const message = [];
  let dir = [1, 0];
  const pos = [0, field[0].indexOf('|')];
  const width = Math.max(...field.map((line) => line.length));
  let steps = 0;

  while(
    field[pos[0]][pos[1]] !== '' &&
    pos[0] >= 0 && pos[0] < field.length &&
    pos[1] >= 0 && pos[1] < width
  ) {
    const curr = field[pos[0]][pos[1]] || '';
    if (curr === '+') {
      if (field[pos[0] + dir[0]] && field[pos[0] + dir[0]][pos[1] + dir[1]]) {
        pos[0] += dir[0];
        pos[1] += dir[1];
        steps++;
        continue;
      }
      dir = [dir[1], dir[0]];
      if (field[pos[0] + dir[0]] && field[pos[0] + dir[0]][pos[1] + dir[1]]) {
        pos[0] += dir[0];
        pos[1] += dir[1];
        steps++;
        continue;
      }
      dir = [-dir[0], -dir[1]];
      if (field[pos[0] + dir[0]] && field[pos[0] + dir[0]][pos[1] + dir[1]]) {
        pos[0] += dir[0];
        pos[1] += dir[1];
        steps++;
        continue;
      }
    } else if (curr === '|' || curr === '-') {
      pos[0] += dir[0];
      pos[1] += dir[1];
      steps++;
    } else {
      message.push(curr);
      pos[0] += dir[0];
      pos[1] += dir[1];
      steps++;
    }
  }
  return steps;
}