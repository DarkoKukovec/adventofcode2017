const pattern = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#'],
]

function serialize(matrix) {
  return matrix.map((line) => line.join('')).join('/');
}

function deserialize(pattern) {
  return pattern.split('/').map((line) => line.split(''));
}

function split(matrix) {
  const matrices = [];
  const size = matrix.length;
  const partSize =  (size % 2 === 0) ? 2 : 3;
  const perLine = size / partSize;
  for (let x = 0; x < perLine; x++) {
    const startX = x * partSize;
    for (let y = 0; y < perLine; y++) {
      const startY = y * partSize;
      const item = matrix
        .slice(startX, startX + partSize)
        .map((line) => line.slice(startY, startY + partSize));
      matrices.push(item);
    }
  }

  return matrices;
}

function combine(matrices) {
  const matrix = [];
  const perLine = Math.sqrt(matrices.length);
  const singleSize = matrices[0].length;
  for (let x = 0; x < perLine; x++) {
    const items = matrices.slice(x * perLine, x * perLine + perLine);
    for (let index = 0; index < singleSize; index++) {
      const line = items.reduce((arr, item) => arr.concat(item[index]), []);
      matrix.push(line);
    }
  }
  return matrix;
}

function rotate(matrix) {
  const rotated = [];
  const n = matrix.length;
  for (i = 0; i < n; ++i) {
    rotated[i] = rotated[i] || [];
    for (j = 0; j < n; ++j) {
      rotated[i][j] = matrix[n - j - 1][i];
    }
  }
  return rotated;
}

function flip(matrix) {
  const flipped = [];
  for (let x = 0; x < matrix.length; x++) {
    flipped[x] = flipped[x] || [];
    for (let y = 0; y < matrix.length; y++) {
      flipped[x][y] = matrix[y][x];
    }
  }
  return flipped;
}

function getVariations(matrix) {
  const variations = [
    serialize(matrix),
    serialize(flip(matrix)),
  ];

  let rotated = rotate(matrix);
  variations.push(serialize(rotated));
  variations.push(serialize(flip(rotated)));

  rotated = rotate(rotated);
  variations.push(serialize(rotated));
  variations.push(serialize(flip(rotated)));

  rotated = rotate(rotated);
  variations.push(serialize(rotated));
  variations.push(serialize(flip(rotated)));

  return variations;
}

function convert(matrix, rules) {
  const variations = getVariations(matrix);
  const rule = rules.find((item) => variations.indexOf(item.input) !== -1);
  return deserialize(rule.output);
}

module.exports = (input) => {
  let matrix = pattern;
  const rules = input
    .split('\n')
    .map((line) => ({
      input: line.split(' => ')[0],
      output: line.split(' => ')[1],
    }));

  for (let step = 0; step < 18; step++) {
    const matrices = split(matrix).map((item) => convert(item, rules));
    matrix = combine(matrices);
  }

  return matrix.reduce((sum, line) => {
    return sum + line.reduce((lineSum, item) => lineSum + (item === '#' ? 1 : 0), 0);
  }, 0);
};
