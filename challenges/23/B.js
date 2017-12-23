function isComposite(num) {
  let test = 1;
  const target = Math.ceil(Math.sqrt(num));
  while(++test < target) {
    if (num % test === 0) {
      return 1;
    }
  }
  return 0;
}

module.exports = () => {
  let b = 65 * 100 + 100000;
  const c = b + 17000;
  let h = 0;

  for (; b <= c; b+= 17) {
    h += isComposite(b);
  }
  return h;
}
