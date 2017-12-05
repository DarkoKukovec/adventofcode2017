module.exports = (input) => {
  const cmds = input.split('\n').map(Number);
  let pos = 0;
  let steps = 0;
  while(pos >= 0 && pos < cmds.length) {
    steps++;
    const newPos = pos + cmds[pos];
    cmds[pos] += cmds[pos] >= 3 ? -1 : 1;
    pos = newPos;
  }
  return steps;
}