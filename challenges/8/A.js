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
      return comp(getValue(registers, regB))
        ? updateValue(registers, regA, val)
        : registers;
    }, {});
    return Math.max(...Object.values(registers));
}