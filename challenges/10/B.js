function getString(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

function reverseFirst(arr, num, pos) {
  const alignedHash = arr.slice(pos).concat(arr.slice(0, pos));
  const reversedHash = alignedHash.slice(0, num).reverse().concat(alignedHash.slice(num));
  return reversedHash.slice(-pos).concat(reversedHash.slice(0, -pos));
}

const HASH_SIZE = 256;
const SUFFIX = [17, 31, 73, 47, 23];

module.exports = (input) => {
  let position = 0;
  let skipSize = 0;
  let hashString = getString(HASH_SIZE);
  const lengths = input.split('').map((char) => char.charCodeAt(0)).concat(SUFFIX);

  for (let round = 0; round < 64; round++) {
    for (const length of lengths) {
      hashString = reverseFirst(hashString, length, position);
      position = (position + length + skipSize) % HASH_SIZE;
      skipSize++;
    }
  }

  const denseHash = [];
  for (let block = 0; block < 16; block++) {
    const blockValues = hashString.slice(block * 16, (block + 1) * 16);
    denseHash.push(blockValues.reduce((s, c) => s ^ c));
  }

  return denseHash
    .map((bit) => bit.toString(16).padStart(2, '0'))
    .join('');
}
