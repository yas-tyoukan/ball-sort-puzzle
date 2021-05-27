const tubes = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 3, 2, 1], [], []];
const questions = [tubes, tubes, tubes];

export default {
  tubes,
  questions,
  currentLevel: 0,
  selectedTubeIndex: null,
  setSelectedTubeIndex: () => {},
  isCompleted: false,
  setCurrentLevel: () => {},
  reset: () => {},
  move: () => {},
};
