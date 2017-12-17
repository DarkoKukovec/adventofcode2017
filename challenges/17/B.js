module.exports = (input) => {
  const stepSize = parseInt(input, 10);
  let position = 0;
  let memorySize = 1;
  let zeroPosition = 0;
  let nextNumber = 0;

  for (let step = 1; step <= 50000000; step++) {
    const nextPosition = (position + stepSize) % memorySize + 1;
    memorySize++;
    if (nextPosition <= zeroPosition) {
      zeroPosition++;
    } else if (nextPosition === zeroPosition + 1) {
      nextNumber = step;
    }
    position = nextPosition;
  }
  return nextNumber;
}
