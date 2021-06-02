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

const solve = (board, history = [], moves = [], n = 0) => {
  if (n === 0) {
    // eslint-disable-next-line no-param-reassign
    history[n] = board;
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
  const undo = () => {
    // undo
    moves[n - 1].shift();
    history.pop();
    moves.pop();
    return solve(board, history, moves, n - 1);
  };
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
  return solve(board, history, moves, n + 1);
};

const main = () => {
  const ret = solve([[1, 1, 2], [2], [3, 3, 3, 4], [4, 4, 4, 7], [5, 5, 5, 5], [6, 6, 6, 6], [7, 7, 7, 3], [8, 8, 8, 1], [8, 1, 2], [2]]);
  console.log(JSON.stringify(ret, null, 2));
};
main();
