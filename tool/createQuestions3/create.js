const fs = require('fs');
const Random = require('random-seed');
const shuffle = require('../util/shuffle');
const solver = require('../solver');

/**
 * ランダムの盤面を作成する
 * @param level
 * @returns {[]}
 */
const createRandomQuestion = (level, rand) => {
  let filledTubesLength;
  let blankTubesLength;
  if (level < 2) {
    filledTubesLength = 2;
    blankTubesLength = 1;
  } else if (level < 28) {
    filledTubesLength = parseInt(level / 2, 10) + 2;
    blankTubesLength = 2;
  } else {
    filledTubesLength = 14;
    blankTubesLength = 2;
  }
  const balls = [];
  const tubes = [];
  for (let i = 1; i <= filledTubesLength; i += 1) {
    Array.prototype.push.apply(balls, [i, i, i, i]);
  }
  const s = shuffle(balls, rand);
  for (let i = 0; i < filledTubesLength; i += 1) {
    tubes.push([s[i * 4], s[i * 4 + 1], s[i * 4 + 2], s[i * 4 + 3]]);
  }
  for (let i = 0; i < blankTubesLength; i += 1) {
    tubes.push([]);
  }

  return tubes;
};

const main = async () => {
  const ret = [];
  const [maxLevel, filepath] = process.argv.slice(2);
  // seed指定
  const rand = new Random(21);
  for (let i = 0; i < maxLevel; i += 1) {
    while (true) {
      const q = createRandomQuestion(i, rand);
      const answer = solver(q);
      if (answer) {
        ret.push(q);
        console.log(`level ${i}: ${q}`);
        break;
      }
    }
  }

  // 書き出し
  fs.writeFile(filepath, JSON.stringify(ret), (err) => {
    if (err) {
      throw err;
    }
    console.log(`level ${ret.length} write success: ${filepath}`);
  });
};

module.exports = main;
