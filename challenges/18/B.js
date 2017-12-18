function getValue(register, val) {
  if (val.charCodeAt(0) < 58) {
    return parseInt(val, 10);
  } else {
    return register[val] || 0;
  }
}

function* program(id, cmds, send) {
  const register = {p: id};
  let position = 0;
  while (position >=0 && position < cmds.length) {
    const {cmd, X, Y} = cmds[position];
    if (cmd === 'jgz') {
      if (getValue(register, X) > 0) {
        position += getValue(register, Y);
        continue;
      }
    } else if (cmd === 'snd') {
      // console.log('send', id, getValue(register, X));
      send(id, getValue(register, X));
    } else if (cmd === 'set') {
      register[X] = getValue(register, Y);
    } else if (cmd === 'add') {
      register[X] = getValue(register, X) + getValue(register, Y);
    } else if (cmd === 'mul') {
      register[X] = getValue(register, X) * getValue(register, Y);
    } else if (cmd === 'mod') {
      register[X] = getValue(register, X) % getValue(register, Y);
    } else if (cmd === 'rcv') {
      register[X] = yield id;
      // console.log('receive', id, X, register[X]);
    }
    position++;
  }
}

module.exports = (input) => {
  const cmds = input
    .split('\n')
    .map((line) => line.split(/\s+/))
    .map((line) => ({cmd: line[0], X: line[1], Y: line[2]}));

  let result = 0;
  const data = [[], []];

  function send(id, value) {
    // console.log(id, value)
    data[id].push(value);
    if (id === 1) {
      result++;
      if (result % 1000000 === 0) console.log(result, data[0].length, data[1].length)
    }
  }

  const prog0 = program(0, cmds, send);
  const prog1 = program(1, cmds, send);

  // Start!
  let prog0res = prog0.next();
  let prog1res = prog1.next();

  do {
    while(data[0].length && !prog1res.done) {
      prog1res = prog1.next(data[0].shift());
    }
    while(data[1].length && !prog0res.done) {
      prog0res = prog0.next(data[1].shift());
    }
  } while((data[0].length && !prog1res.done) || (data[1].length && !prog0res.done));

  return result;
}