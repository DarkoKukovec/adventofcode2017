function getChildrenWeight(tower) {
  const weights = tower.children.map((tower) => {
    tower.weightWithChildren = tower.weightWithChildren || getChildrenWeight(tower).reduce((s, c) => s + c) + tower.weight;
    return tower.weightWithChildren;
  });
  tower.weightWithChildren = weights.reduce((s, c) => s + c, 0) + tower.weight;
  return weights;
}

function isBalanced(weights) {
  if (weights.length) {
    const first = weights[0];
    return weights.every((item) => item === first);
  }
  return true;
}

module.exports = (input) => {
  const map = {};
  const unbalancedChildren = input
    .split('\n')
    .map((line) => {
      const [name, children] = line.split(' -> ');
      const weight = parseInt(name.split('(')[1].slice(0, -1), 10);
      const tower = {
        name: name.split(/\s+/).shift(),
        weight,
        children: children ? children.split(', ') : [],
        weightWithChildren: 0,
        correctWeight: true,
      };
      map[tower.name] = tower;
      return tower;
    })
    .map((tower, _index, towers) => {
      tower.children = tower.children.map((name) => map[name]);
      if (tower.children.length === 0) {
        tower.weightWithChildren = tower.weight;
      }
      return tower;
    })
    .filter((tower) => !isBalanced(getChildrenWeight(tower)))
    .sort((a, b) => a.weightWithChildren - b.weightWithChildren)
    .shift()
    .children;

  const weights = {};
  unbalancedChildren.forEach((child) => {
    weights[child.weightWithChildren] = weights[child.weightWithChildren] || 0;
    weights[child.weightWithChildren]++;
  });
  const [wrong, correct] = Object.keys(weights)
    .map(Number)
    .sort((a, b) => weights[a] - weights[b]);
  const wrongTower = unbalancedChildren.find((item) => item.weightWithChildren === wrong);
  return wrongTower.weight - (wrong - correct);
}