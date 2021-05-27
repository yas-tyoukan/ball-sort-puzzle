const fs = require('fs');
const moveRandom = require('./moveRandom');

const createQuestion = (level) => {
  let filledTubesLength;
  let blankTubesLength;
  if (level < 2) {
    filledTubesLength = 2;
    blankTubesLength = 1;
  } else if (level < 4) {
    filledTubesLength = 3;
    blankTubesLength = 1;
  } else if (level < 6) {
    filledTubesLength = 4;
    blankTubesLength = 2;
  } else if (level < 8) {
    filledTubesLength = 5;
    blankTubesLength = 2;
  } else {
    filledTubesLength = 8;
    blankTubesLength = 2;
  }
  const tubes = [];
  for (let i = 1; i <= filledTubesLength; i += 1) {
    const tube = [i, i, i, i];
    tubes.push(tube);
  }
  for (let i = 1; i <= blankTubesLength; i += 1) {
    tubes.push([]);
  }

  moveRandom(tubes);

  return tubes;
};

const main = async () => {
  const ret = [];
  const [maxLevel, filepath] = process.argv.slice(2);
  for (let i = 0; i < maxLevel; i += 1) {
    console.log(`level: ${i}`);
    ret.push(createQuestion(i));
  }
  // 書き出し
  fs.writeFile(filepath, JSON.stringify(ret), (err) => {
    if (err) {
      throw err;
    }
    console.log(`write success: ${filepath}`);
  });
};

main();
