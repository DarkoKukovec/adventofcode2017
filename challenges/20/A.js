function propDist(p, prop) {
  return Math.abs(p[prop].x) + Math.abs(p[prop].y) + Math.abs(p[prop].z);
}

module.exports = (input) => {
  const particles = input
    .split('\n')
    .map((line) => {
      const parts = line.split('<');
      const p = parts[1].split(/,|>/);
      const v = parts[2].split(/,|>/);
      const a = parts[3].split(/,|>/);
      return {
        p: {
          x: ~~p[0],
          y: ~~p[1],
          z: ~~p[2],
        },
        v: {
          x: ~~v[0],
          y: ~~v[1],
          z: ~~v[2],
        },
        a: {
          x: ~~a[0],
          y: ~~a[1],
          z: ~~a[2],
        }
      }
    });

  const accelerations = particles.map((p) => propDist(p, 'a'));
  const minAcc = Math.min(...accelerations);
  const minAccParticles = particles.filter((p) => propDist(p, 'a') === minAcc);
  const speeds = minAccParticles.map((p) => propDist(p, 'v'));
  const minSpeed = Math.min(...speeds);
  const minAccSpeedParticles = minAccParticles.filter((p) => propDist(p, 'v') === minSpeed);
  minAccSpeedParticles.sort((a, b) => propDist(a, 'p') - propDist(b, 'p'));
  return particles.indexOf(minAccSpeedParticles[0]);
}