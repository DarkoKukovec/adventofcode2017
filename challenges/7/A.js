module.exports = (input) => {
  return input
    .split('\n')
    .map((line) => {
      const [name, children] = line.split(' -> ');
      return {
        name: name.split(/\s+/).shift(),
        children: children ? children.split(', ') : [],
        root: true,
      };
    })
    .map((tower, _index, towers) => {
      tower.children.forEach((name) => void (towers.find((item) => item.name === name).root = false))
      return tower;
    })
    .find((tower) => tower.root).name;
}