module.exports = (input) => input
  .split('\n')
  .filter((pass) =>  pass
    .split(/\s+/)
    .reduce((map, item) => (!map || map.includes(item.split('').sort().join('')))
      ? false
      : map.concat(item.split('').sort().join('')),
    []))
  .length;