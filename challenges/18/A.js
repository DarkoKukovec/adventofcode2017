function getValue(register, val) {
  if (val.charCodeAt(0) < 58) {
    return parseInt(val, 10);
  } else {
    return register[val] || 0;
  }
}

module.exports = (input) => {
  const register = {};
  let position = 0;
  let lastPlayed = null;
  const cmds = input
    .split('\n')
    .map((line) => line.split(/\s+/))
    .map((line) => ({cmd: line[0], X: line[1], Y: line[2]}));

  while (position >=0 && position < cmds.length) {
    const {cmd, X, Y} = cmds[position];
    if (cmd === 'jgz') {
      if (getValue(register, X) > 0) {
        position += getValue(register, Y);
        continue;
      }
    } else if (cmd === 'snd') {
      lastPlayed = getValue(register, X);
    } else if (cmd === 'set') {
      register[X] = getValue(register, Y);
    } else if (cmd === 'add') {
      register[X] = getValue(register, X) + getValue(register, Y);
    } else if (cmd === 'mul') {
      register[X] = getValue(register, X) * getValue(register, Y);
    } else if (cmd === 'mod') {
      register[X] = getValue(register, X) % getValue(register, Y);
    } else if (cmd === 'rcv') {
      if (getValue(register, X)) {
        return lastPlayed;
      }
    }
    position++;
  }
}