module.exports = (input) => {
  const graph = {}
  input
    .split('\n')
    .map((line) => {
      const [src, dest] = line.split(' <-> ');
      graph[src] = dest.split(', ');
    });

  const visited = [];
  const toVisit = ['0'];
  while(toVisit.length) {
    const next = toVisit.shift();
    visited.push(next);
    graph[next].map((point) => {
      if (visited.indexOf(point) === -1 && toVisit.indexOf(point) === -1) {
        toVisit.push(point);
      }
    })
  }

  return visited.length;
}