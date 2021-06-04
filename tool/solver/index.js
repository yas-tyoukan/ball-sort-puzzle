const isValidMove = (board, [f, t]) => {
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
  return !tt.length || ft[ft.length - 1] === tt[tt.length - 1];
};

const listValidMoves = (board) => {
  const ret = [];
  for (let f = 0, l = board.length; f < l; f += 1) {
    for (let t = 0; t < l; t += 1) {
      if (isValidMove(board, [f, t])) {
        ret.push([f, t]);
      }
    }
  }
  return ret;
};

const isComplete = (board) => board.every(
  (t) => t.length === 0 || (t.length === 4 && t.every((i) => t[0] === i)),
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

const solve = (board) => {
  const history = [board];
  const moves = [];
  let n = 0;
  let isUndo = false;
  while (true) {
    if (isUndo) {
      n -= 1;
      moves[n].shift();
      history.pop();
      moves.pop();
      isUndo = false;
    }
    const currentBoard = history[n];
    if (isComplete(currentBoard)) {
      // solved. return answer moves.
      return moves.map(([m]) => m);
    }
    if (!moves[n]) {
      // eslint-disable-next-line no-param-reassign
      moves[n] = listValidMoves(currentBoard);
    }
    if (n === 0 && !moves[n].length) {
      // can't solve
      return false;
    }
    if (!moves[n].length) {
      isUndo = true;
    }
    if (!isUndo) {
      const nextBoard = move(currentBoard, moves[n][0]);
      if (history.find((b) => isSameBoard(b, nextBoard))) {
        // 過去と一致する盤面が出てきたらundoする
        isUndo = true;
      } else {
        history[n + 1] = nextBoard;
        // next
        n += 1;
      }
    }
  }
};

module.exports = solve;
