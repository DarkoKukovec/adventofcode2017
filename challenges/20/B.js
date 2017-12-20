function move(particle) {
  particle.v.x += particle.a.x;
  particle.v.y += particle.a.y;
  particle.v.z += particle.a.z;
  particle.p.x += particle.v.x;
  particle.p.y += particle.v.y;
  particle.p.z += particle.v.z;
}

function propDist(p, prop) {
  return Math.abs(p[prop].x) + Math.abs(p[prop].y) + Math.abs(p[prop].z);
}

module.exports = (input) => {
  let particles = input
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

  // HACK: Assume 100 iterations are enough for the points to diverge
  for (let i = 0; i < 100; i++) {
    particles.forEach(move);
    const positions = [];
    const collisions = [];

    particles.forEach((p) => {
      const pos = `${p.p.x},${p.p.y},${p.p.z}`;
      if (positions.indexOf(pos) === -1) {
        positions.push(pos);
      } else if (collisions.indexOf(pos) === -1) {
        collisions.push(pos);
      }
    });

    collisions.map((pos) => {
      const [x, y, z] = pos.split(',').map(Number);
      particles = particles.filter((p) => p.p.x !== x || p.p.y !== y || p.p.z !== z);
    });
  }

  return particles.length;
}
