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
  for (let lines = 0; lines < perLine * singleSize; lines++) {
    matrix.push([]);
  }
  matrices.forEach((item, index) => {
    const rowStart = Math.floor(index / perLine) * singleSize;
    const colStart = (index % perLine) * singleSize;
    for (let row = 0; row < singleSize; row++) {
      for (let col = 0; col < singleSize; col++) {
        matrix[rowStart + row][colStart + col] = item[row][col];
      }
    }
  });
  return matrix;
}

function rotate(matrix) {
  const rotated = [];
  const n = matrix.length;
  for (let i = 0; i < n; ++i) {
    rotated[i] = rotated[i] || [];
    for (let j = 0; j < n; ++j) {
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

function* getVariations(matrix) {
  yield serialize(matrix);
  yield serialize(flip(matrix));

  let rotated = rotate(matrix);
  yield serialize(rotated);
  yield serialize(flip(rotated));

  rotated = rotate(rotated);
  yield serialize(rotated);
  yield serialize(flip(rotated));

  rotated = rotate(rotated);
  yield serialize(rotated);
  yield serialize(flip(rotated));
}

function convert(matrix, rules) {
  const variations = getVariations(matrix);
  let variation = variations.next();
  const variationList = [];

  while(!variation.done) {
    if (rules[variation.value]) {
      variationList.forEach((item) => {
        rules[item] = rules[variation.value];
      });
      return rules[variation.value];
    }
    variationList.push(variation.value);
    variation = variations.next();
  }
}

module.exports = (input) => {
  let matrix = pattern;
  const rules = input.split('\n').reduce((r, line) => {
    const [input, output] = line.split(' => ');
    r[input] = deserialize(output);
    return r;
  }, {});

  for (let step = 0; step < 18; step++) {
    const matrices = split(matrix).map((item) => convert(item, rules));
    matrix = combine(matrices);
  }

  return matrix.reduce((sum, line) => {
    return sum + line.reduce((lineSum, item) => lineSum + (item === '#' ? 1 : 0), 0);
  }, 0);
};
