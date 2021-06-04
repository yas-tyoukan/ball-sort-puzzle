module.exports = ([...array], rand) => {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const j = rand.intBetween(0, i);
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
