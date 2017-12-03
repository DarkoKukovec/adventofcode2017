module.exports = (input) => {
  let position = 0;
  let step = 0;
  let num = 1;
  let prev;
  do {
    prev = num;
    position = (position + 1) % 4;
    num += step * 2 + ~~!position;
    step += ~~!position;
  } while(num < input);
  return Math.min(input - prev, num - input) + step;
}
