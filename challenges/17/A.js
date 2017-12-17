module.exports = (input) => {
  const memory = [0];
  const stepSize = parseInt(input, 10);
  let position = 0;

  for (let step = 1; step <= 2017; step++) {
    const nextPosition = (position + stepSize) % memory.length + 1;
    memory.splice(nextPosition, 0, step);
    position = nextPosition;
  }
  return memory[(position + 1) % memory.length];
}
