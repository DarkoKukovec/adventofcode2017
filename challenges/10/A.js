function getString(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

function reverseFirst(arr, num, pos) {
  const alignedHash = [
    ...arr.slice(pos),
    ...arr.slice(0, pos),
  ];

  const reversedHash = [
    ...alignedHash.slice(0, num).reverse(),
    ...alignedHash.slice(num),
  ];

  return [
    ...reversedHash.slice(-pos),
    ...reversedHash.slice(0, -pos)
  ];
}

const HASH_SIZE = 256;

module.exports = (input) => {
  let position = 0;
  let skipSize = 0;
  let hashString = getString(HASH_SIZE);
  input
    .split(',')
    .map(Number)
    .map((length) => {
      hashString = reverseFirst(hashString, length, position);
      position = (position + length + skipSize) % HASH_SIZE;
      skipSize++;
    });
  return hashString[0] * hashString[1];
}
