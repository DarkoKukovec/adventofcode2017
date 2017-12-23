function getValue(register, val) {
  return val.charCodeAt(0) < 58 ? parseInt(val, 10) : register[val];
}

module.exports = (input) => {
  const register = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};
  let position = 0;
  const cmds = input
    .split('\n')
    .map((line) => line.split(/\s+/))
    .map((line) => ({cmd: line[0], X: line[1], Y: line[2]}));
  let mulInvoke = 0;

  while (position >= 0 && position < cmds.length) {
    const {cmd, X, Y} = cmds[position];
    if (cmd === 'jnz') {
      if (getValue(register, X) !== 0) {
        position += getValue(register, Y);
        continue;
      }
    } else if (cmd === 'set') {
      register[X] = getValue(register, Y);
    } else if (cmd === 'sub') {
      register[X] -= getValue(register, Y);
    } else if (cmd === 'mul') {
      mulInvoke++;
      register[X] *= getValue(register, Y);
    }
    position++;
  }

  return mulInvoke;
}
