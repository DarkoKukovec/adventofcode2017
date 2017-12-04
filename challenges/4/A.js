module.exports = (input) => input
  .split('\n')
  .filter((pass) =>  pass
    .split(/\s+/)
    .reduce((map, item) => (!map || map.includes(item)) ? false : map.concat(item), []))
  .length;