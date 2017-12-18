module.exports = (input) => {
  const map = {};
  return input
    .split('\n')
    .map((line) => {
      const [name, children] = line.split(' -> ');
      const tower = {
        name: name.split(/\s+/).shift(),
        children: children ? children.split(', ') : [],
        root: true,
      };
      map[tower.name] = tower;
      return tower;
    })
    .filter((tower, _index, towers) => tower.children.filter((name) => (map[name].root = false)))
    .find((tower) => tower.root).name;
}