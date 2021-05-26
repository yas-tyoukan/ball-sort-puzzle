import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import questions from '~/questions';

// React Contextの作成
const BoardContext = createContext();

export const BoardContextProviderWrapper = ({
  children,
}) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [tubes, setTubes] = useState(questions[currentLevel]);
  const [selectedTubeIndex, setSelectedTubeIndex] = useState(null);

  useEffect(() => {
    setTubes(questions[currentLevel]);
  }, [currentLevel]);

  const reset = () => {
    setTubes(questions[currentLevel]);
  };

  // 全てのチューブが空のチューブまたは同じアイテムが4つ入ったチューブかを判定
  const isCompleted = tubes.every(
    (t) => t.length === 0 || (t.length === 4 && t.every((i) => t[0] === i)),
  );

  const isAbleToMove = (from, to) => {
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
    return !tt.length || ft[ft.length - 1] === tt[tt.length - 1];
  };

  const move = (from, to) => {
    if (from === to) {
      setSelectedTubeIndex(null);
      return false;
    }
    if (!isAbleToMove(from, to)) {
      setSelectedTubeIndex(to);
      return false;
    }
    const ft = tubes[from].slice();
    const tt = tubes[to].slice();
    tt.push(ft.pop());
    const nextTubes = tubes.slice();
    nextTubes.splice(from, 1, ft);
    nextTubes.splice(to, 1, tt);
    setTubes(nextTubes);
    setSelectedTubeIndex(null);
    return true;
  };

  const value = {
    tubes,
    questions,
    currentLevel,
    selectedTubeIndex,
    setSelectedTubeIndex,
    isCompleted,
    setCurrentLevel,
    reset,
    move,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

BoardContextProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoardContext;
