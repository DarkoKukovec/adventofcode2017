module.exports = (input) => {
  const graph = {}
  input
    .split('\n')
    .map((line) => {
      const [src, dest] = line.split(' <-> ');
      graph[src] = dest.split(', ');
    });

  const visited = [];
  const toVisit = [];
  let allPoints = Object.keys(graph);
  let groups = 0;
  while(allPoints.length) {
    groups++;
    toVisit.push(allPoints.shift());
    while(toVisit.length) {
      const next = toVisit.shift();
      visited.push(next);
      graph[next].map((point) => {
        if (visited.indexOf(point) === -1 && toVisit.indexOf(point) === -1) {
          toVisit.push(point);
          allPointsIndex = allPoints.indexOf(point);
          allPoints = [...allPoints.slice(0, allPointsIndex), ...allPoints.slice(allPointsIndex + 1)];
        }
      })
    }
  }

  return groups;
}