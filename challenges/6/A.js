module.exports = (input) => {
  const blocks = input.split(/\s+/).map(Number);
  const blockCount = blocks.length;
  const history = [];

  do {
    history.push(blocks.join(','));
    const max = Math.max(...blocks);
    const index = blocks.indexOf(max);
    blocks[index] = 0;

    for (let pos = 1; pos <= max; pos++) {
      blocks[(index + pos) % blockCount] ++;
    }
  } while(history.indexOf(blocks.join(',')) === -1)

  const repeated = history.indexOf(blocks.join(','));
  return history.length;
}
