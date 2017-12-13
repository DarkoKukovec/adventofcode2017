function moveRange(fws) {
  fws.forEach((item) => {
    item.current += item.dir;
    if (item.current === 0 || item.current === item.range - 1) {
      item.dir *= -1;
    }
  });
}

module.exports = (input) => {
  const fws = input
    .split('\n')
    .map((line) => {
      const [depth, range] = line.split(': ').map(Number);
      return ({
        depth,
        range,
        current: 0,
        dir: 1,
      })
    });

    let severity = 0;
    const total = Math.max(...fws.map((fw) => fw.depth));
    for (let position = 0; position <= total; position ++) {
      const fw = fws.find((item) => item.depth === position);
      if (fw && fw.current === 0) {
        severity += fw.depth * fw.range;
      }
      moveRange(fws);
    }

    return severity;
}