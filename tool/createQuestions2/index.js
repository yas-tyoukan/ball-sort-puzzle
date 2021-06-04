const fs = require('fs');
const Random = require('random-seed');
const shuffle = require('../util/shuffle');

// seed指定
const rand = new Random(1);

/**
 * 解けた状態の盤面を作成する
 * @param level
 * @returns {[]}
 */
const createSolvedBoard = (level) => {
  let filledTubesLength;
  let blankTubesLength;
  if (level < 2) {
    filledTubesLength = 2;
    blankTubesLength = 1;
  } else if (level < 4) {
    filledTubesLength = 3;
    blankTubesLength = 2;
  } else if (level < 6) {
    filledTubesLength = 4;
    blankTubesLength = 2;
  } else if (level < 8) {
    filledTubesLength = 5;
    blankTubesLength = 2;
  } else if (level < 16) {
    filledTubesLength = 8;
    blankTubesLength = 2;
  } else {
    filledTubesLength = 12;
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

  return tubes;
};

/**
 * 解く時の操作の逆操作として正しい操作かどうか
 * @param board
 * @param f
 * @param t
 * @returns {boolean}
 */
const isValidReverseMove = (board, [f, t]) => {
  if (f === t) {
    return false;
  }
  const ft = board[f];
  if (!ft || !ft.length) {
    return false;
  }
  const tt = board[t];
  if (!tt || tt.length === 4) {
    return false;
  }
  const b = ft.slice(-1)[0];
  const under = ft.slice(-2)[0];
  return b === under || under == null;
};

const listValidReverseMoves = (board) => {
  const ret = [];
  for (let f = 0, l = board.length; f < l; f += 1) {
    for (let t = 0; t < l; t += 1) {
      if (isValidReverseMove(board, [f, t])) {
        ret.push([f, t]);
      }
    }
  }
  return ret;
};

const isQuestion = (board) => board.every(
  (t) => t.length === 0 || (t.length === 4 && !t.every((i) => t[0] === i)),
);

const copyBoard = (board) => JSON.parse(JSON.stringify(board));

const move = (board, [f, t]) => {
  const b = copyBoard(board);
  if (f === t) {
    return b;
  }
  b[t].push(b[f].pop());
  return b;
};

const isSameBoard = (b1, b2) => copyBoard(b1).sort().join('/').toString() === copyBoard(b2).sort().join('/').toString();

const reverseSolve = (board, history = [], moves = [], n = 0) => {
  if (n === 0) {
    // eslint-disable-next-line no-param-reassign
    history[n] = board;
  }
  const currentBoard = history[n];

  const undo = () => {
    // undo
    moves[n - 1].shift();
    history.pop();
    moves.pop();
    return reverseSolve(board, history, moves, n - 1);
  };

  if (isQuestion(currentBoard)) {
    // 手数を指定すると Maximum call stack size exceeded になってしまうのでコメントアウトしている
    // const boardLength = board.length;
    // const difficulty = boardLength < 5 ? 1 : boardLength * 1;
    // if (n < difficulty) {
    //   // 最低手数にみたない場合はやり直し
    //   return undo();
    // }
    // return question board.
    return currentBoard.sort().reverse();
  }
  if (!moves[n]) {
    // 移動可能な手を設定。順序はランダム
    // eslint-disable-next-line no-param-reassign
    moves[n] = shuffle(listValidReverseMoves(currentBoard), rand);
  }
  if (!moves[n].length) {
    if (n === 0) {
      // can't solve
      return false;
    }
    return undo();
  }

  // eslint-disable-next-line no-param-reassign
  const nextBoard = move(currentBoard, moves[n][0]);
  if (history.find((b) => isSameBoard(b, nextBoard))) {
    // 過去と一致する盤面が出てきたらundoする
    return undo();
  }
  // eslint-disable-next-line no-param-reassign
  history[n + 1] = nextBoard;
  // next
  return reverseSolve(board, history, moves, n + 1);
};

const main = async () => {
  const ret = [];
  const [maxLevel, filepath] = process.argv.slice(2);
  for (let i = 0; i < maxLevel; i += 1) {
    const solved = createSolvedBoard(i);
    const b = reverseSolve(solved);
    if (b) {
      ret.push(b);
    }
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
