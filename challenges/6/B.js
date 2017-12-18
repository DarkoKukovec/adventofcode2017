module.exports = (input) => {
  const blocks = input.split(/\s+/).map(Number);
  const blockCount = blocks.length;
  const history = [];
  let historyItem = '';

  do {
    history.push(historyItem);
    const max = Math.max(...blocks);
    const index = blocks.indexOf(max);
    blocks[index] = 0;

    for (let pos = 1; pos <= max; pos++) {
      blocks[(index + pos) % blockCount]++;
    }
    historyItem = blocks.join(',');
  } while(history.indexOf(historyItem) === -1);

  return history.length - history.indexOf(historyItem);
}
