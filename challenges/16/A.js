module.exports = (input) => {
  let standing = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
  const steps = input
    .split(',')
    .map((line) => {
      if (line[0] === 's') {
        const count = ~~line.slice(1);
        return (arr) => arr.slice(-count).concat(arr.slice(0, -count));
      } else if (line[0] === 'p') {
        return (arr) => {
          const indexA = arr.indexOf(line[1]);
          const indexB = arr.indexOf(line[3]);
          const tmp = arr[indexA];
          arr[indexA] = arr[indexB];
          arr[indexB] = tmp;
          return arr;
        }
      } else {
        const parsed = line.slice(1).split('/')
        const indexA = ~~parsed[0];
        const indexB = ~~parsed[1];
        return (arr) => {
          const tmp = arr[indexA];
          arr[indexA] = arr[indexB];
          arr[indexB] = tmp;
          return arr;
        }
      }
    });

  console.time('res')
  const res = steps.reduce((arr, fn) => fn(arr), standing);
  console.timeEnd('res');
  return res.join('');
}