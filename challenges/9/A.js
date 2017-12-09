module.exports = (input) => input
  .split('')
  .reduce((state, item, index, instructions) => {
    if (state.ignoreNext) {
      state.ignoreNext = false;
    } else if (state.isGarbage) {
      if (item === '!') {
        state.ignoreNext = true;
      } else if (item === '>') {
        state.isGarbage = false;
      }
    } else {
      if (item === '<') {
        state.isGarbage = true;
      } else if (item === '{') {
        state.openedGroups++;
      } else if (item === '}') {
        state.score += state.openedGroups;
        state.openedGroups--;
      }
    }
    return state;
  }, {
    score: 0,
    ignoreNext: false,
    isGarbage: false,
    openedGroups: 0,
  })
  .score;
