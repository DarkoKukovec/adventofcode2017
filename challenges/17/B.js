module.exports = (input) => {
  const stepSize = parseInt(input, 10);
  let position = 0;
  let memorySize = 1;
  let zeroPosition = 0;
  let nextNumber;

  for (let step = 1; step <= 50000000; step++) {
    position = (position + stepSize) % memorySize + 1;
    memorySize++;
    if (position <= zeroPosition) {
      zeroPosition++;
    } else if (position === zeroPosition + 1) {
      nextNumber = step;
    }
  }
  return nextNumber;
}
