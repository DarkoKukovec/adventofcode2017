const COMPARATORS = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '!=': (a, b) => a != b,
  '==': (a, b) => a == b,
}

function getValue(registers, name) {
  return registers[name] || 0;
}

function updateValue(registers, name, value) {
  registers[name] = registers[name] || 0;
  registers[name] += value;
  return registers;
}

module.exports = (input) => {
  let max = 0;
  const registers = input
    .split('\n')
    .map((line) => {
      const [regA, dir, val, _, regB, comp, compVal] = line.split(/\s+/);
      return {
        regA,
        val: parseInt(val, 10) * (dir === 'inc' ? +1 : -1),
        regB,
        comp: (a) => COMPARATORS[comp](a, parseInt(compVal, 10)),
      };
    })
    .reduce((registers, {regA, val, regB, comp}) => {
      if (comp(getValue(registers, regB))) {
        updateValue(registers, regA, val)
        max = Math.max(max, ...Object.values(registers));
      }
      return registers;
    }, {});
    return max;
}