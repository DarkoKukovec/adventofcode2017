module.exports = (input) => {
  let state;
  let position = 0;
  const memory = {0: 0}
  const states = {};
  let checkAfter;

  let currentState;
  let currentCheck;
  input
    .split('\n')
    .map((l) => {
      const line = l.trim();
      if (line.startsWith('Begin in state')) {
        state = line.split(/\s+/).pop().slice(0, -1);
      } else if (line.startsWith('Perform a diagnostic')) {
        checkAfter = ~~line.split(/\s+/)[5];
      } else if (line.startsWith('In state')) {
        currentState = line.split(/\s+/).pop().slice(0, -1);
        states[currentState] = states[currentState] || {};
      } else if (line.startsWith('If the current value')) {
        currentCheck = ~~line.split(/\s+/).pop().slice(0, -1);
        states[currentState][currentCheck] = states[currentState][currentCheck] || {};
      } else if (line.startsWith('- Write the value')) {
        states[currentState][currentCheck].write = ~~line.split(/\s+/).pop().slice(0, -1);
      } else if (line.startsWith('- Move one slot')) {
        states[currentState][currentCheck].direction = line.split(/\s+/).pop() === 'left.' ? -1 : 1;
      } else if (line.startsWith('- Continue with')) {
        states[currentState][currentCheck].nextState = line.split(/\s+/).pop().slice(0, -1);
      }
    });

  for (let step = 0; step < checkAfter; step++) {
    const value = memory[position] || 0;
    const stateObj = states[state][value];
    memory[position] = stateObj.write;
    position += stateObj.direction;
    state = stateObj.nextState;
  }

  return Object.values(memory).reduce((s, c) => s + c);
}
