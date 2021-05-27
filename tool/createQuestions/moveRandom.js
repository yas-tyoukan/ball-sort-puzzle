const Random = require('random-seed');

// seed指定
const rand = new Random(1);

const isAbleToMove = (from, to, tubes) => {
  if (from === to) {
    return false;
  }
  const ft = tubes[from];
  if (!ft || !ft.length) {
    return false;
  }
  const tt = tubes[to];
  if (!tt || tt.length === 4) {
    return false;
  }
  const b = ft.slice(-1)[0];
  const under = ft.slice(-2)[0];
  return b === under || under == null;
};

const move = (from, to, tubes) => {
  if (!isAbleToMove(from, to, tubes)) {
    return false;
  }
  const ft = tubes[from].slice();
  const tt = tubes[to].slice();
  tt.push(ft.pop());
  tubes.splice(from, 1, ft);
  tubes.splice(to, 1, tt);
  return true;
};

module.exports = (tubes) => {
  let count = 0;
  const { length } = tubes;
  while (count < length * 10) {
    const f = rand.intBetween(0, length);
    const t = rand.intBetween(0, length);
    move(f, t, tubes);
    count += 1;
  }
};
