function addComponents(bridge) {
  return bridge.components
    .filter((item) => item.a === bridge.port || item.b === bridge.port)
    .map((comp) => {
      const compIndex = bridge.components.indexOf(comp);
      const newComponents = bridge.components.slice();
      newComponents.splice(compIndex, 1);
      return {
        components: newComponents,
        line: bridge.line.slice().concat([comp]),
        port: comp.a + comp.b - bridge.port,
      }
    });
}

function build(bridges, toVisitBridges = bridges) {
  const newBridges = [];
  toVisitBridges.forEach((bridge) => {
    newBridges.push(...addComponents(bridge));
  });

  if (newBridges.length) {
    bridges.push(...newBridges);
    build(bridges, newBridges);
  }

}

module.exports = (input) => {
  const components = input
    .split('\n')
    .map((item) => {
      const [a, b] = item.split('/');
      return {a: ~~a, b: ~~b};
    });

  const bridges = [{
    components: components.slice(),
    line: [],
    port: 0,
  }];

  build(bridges);

  return bridges
    .reduce((max, item) => Math.max(max, item.line
        .reduce((sum, i) => sum + i.a + i.b, 0)
      )
    , 0);
}
