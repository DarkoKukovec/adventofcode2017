module.exports = (input) => {
  const map = input.split(',').reduce((map, dir) => {
    map[dir] = ~~map[dir] + 1;
    return map;
  }, {});

  let distance = 0;

  // Eliminate opposite directions
  const nwse = Math.min(map.nw, map.se);
  map.nw -= nwse;
  map.se -= nwse;
  const nesw = Math.min(map.ne, map.sw);
  map.ne -= nesw;
  map.sw -= nesw;
  const ns = Math.min(map.n, map.s);
  map.n -= ns;
  map.s -= ns;

  const nes = Math.min(map.ne, map.s);
  map.ne -= nes;
  map.s -= nes;
  distance += nes;
  const nws = Math.min(map.nw, map.s);
  map.nw -= nws;
  map.s -= nws;
  distance += nws;
  const nse = Math.min(map.n, map.se);
  map.n -= nse;
  map.se -= nse;
  distance += nse;
  const nsw = Math.min(map.n, map.sw);
  map.n -= nsw;
  map.sw -= nsw;
  distance += nsw;
  const nenw = Math.min(map.ne, map.nw);
  map.ne -= nenw;
  map.nw -= nenw;
  distance += nenw;
  const sesw = Math.min(map.se, map.sw);
  map.se -= sesw;
  map.sw -= sesw;
  distance += sesw;

  return distance += Object.values(map).reduce((s, c) => s + c);
}