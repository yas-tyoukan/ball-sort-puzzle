import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BoardContext from '~/contexts/BoardContext';
import Tube from '~/components/organisms/Tube';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  >* {
    margin: 10px;
  }
`;

export const BoardPresenter = ({
  className,
  selectedTubeIndex,
  tubes,
  onClickTube,
  isCompleted,
}) => (
  <Root className={className}>
    {tubes.map((balls, i) => (
      <Tube
        onClick={() => onClickTube(i)}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        balls={balls}
        isSelected={i === selectedTubeIndex}
      />
    ))}
    {isCompleted && <div>complete!!</div>}
  </Root>
);

BoardPresenter.propTypes = {
  className: PropTypes.string,
  selectedTubeIndex: PropTypes.number,
  tubes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isCompleted: PropTypes.bool,
  onClickTube: PropTypes.func,
};

BoardPresenter.defaultProps = {
  className: '',
  selectedTubeIndex: null,
  tubes: [],
  isCompleted: false,
  onClickTube: null,
};

const BoardContainer = ({ className, presenter }) => {
  const {
    selectedTubeIndex,
    setSelectedTubeIndex,
    tubes,
    move,
    isCompleted,
  } = useContext(BoardContext);
  const onClickTube = (i) => {
    if (selectedTubeIndex == null) {
      setSelectedTubeIndex(i);
      return;
    }
    if (i === selectedTubeIndex) {
      setSelectedTubeIndex(null);
      return;
    }
    const tt = tubes[i];
    if (!tt) {
      setSelectedTubeIndex(null);
      return;
    }
    move(selectedTubeIndex, i);
  };
  return presenter({
    className,
    selectedTubeIndex,
    tubes,
    isCompleted,
    onClickTube,
  });
};

export default (props) => (
  <BoardContainer
    presenter={BoardPresenter}
    {...props}
  />
);
