module.exports = (input) => {
  let delay = 0;
  const ranges = {};

  const depths = input
    .split('\n')
    .map((line) => {
      const [depth, range] = line.split(': ').map(Number);
      ranges[depth] = range;
      return depth;
    });
  const total = Math.max(...depths);

  while (true) {
    const pass = depths.every((depth) => depth in ranges ? (delay + depth) % (ranges[depth] * 2 - 2) !== 0 : true);

    if (pass) {
      break;
    }

    delay++;
  }

  return delay;
}