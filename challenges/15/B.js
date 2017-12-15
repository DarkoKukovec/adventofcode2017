function* generator(input, factor, divisor, multiple) {
  let value = input;

  while(true) {
    do {
      value = (value * factor) % divisor;
    } while(value % multiple !== 0);
    yield value;
  }
}

module.exports = (input) => {
  const [inputA, inputB] = input
    .split('\n')
    .map((line) => parseInt(line.split(' ').pop(), 10));

  const DIVISOR = 2147483647;
  const A = generator(inputA, 16807, DIVISOR, 4);
  const B = generator(inputB, 48271, DIVISOR, 8);

  const PAIRS = 5000000;
  let equals = 0;

  for (let pair = 0; pair < PAIRS; pair++) {
    const valueA = A.next().value;
    const valueB = B.next().value;
    if ((valueA & 0xFFFF) === (valueB & 0xFFFF)) {
      equals++;
    }
  }

  return equals;
}