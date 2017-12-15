module.exports = (input) => {
  let [A, B] = input
    .split('\n')
    .map((line) => parseInt(line.split(' ').pop(), 10));

  const FACTOR_A = 16807;
  const FACTOR_B = 48271;
  const DIVISOR = 2147483647;
  const PAIRS = 40000000;
  let equals = 0;

  for (let pair = 0; pair < PAIRS; pair++) {
    A = (A * FACTOR_A) % DIVISOR;
    B = (B * FACTOR_B) % DIVISOR;

    if ((A & 0xFFFF) === (B & 0xFFFF)) {
      equals++;
      // console.log(equals, A, B);
    }
  }

  return equals;
}