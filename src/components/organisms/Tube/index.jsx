import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ball from '~/components/atoms/Ball';

const Root = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 144px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#f44' : '#444')};
  border-top-color: transparent;
  padding: 2px;
  border-radius: 4px;
  box-sizing: border-box;
  width: 40px;
  cursor: pointer;
`;

export const TubePresenter = ({
  className, onClick, balls, isSelected,
}) => (
  <Root className={className} onClick={onClick} isSelected={isSelected}>
    {balls.map((b, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Ball key={i} color={b} />
    ))}
  </Root>
);

TubePresenter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  balls: PropTypes.arrayOf(PropTypes.number),
  isSelected: PropTypes.bool,
};

TubePresenter.defaultProps = {
  className: '',
  onClick: null,
  balls: [],
  isSelected: false,
};

const TubeContainer = ({
  className,
  onClick,
  balls,
  isSelected,
  presenter,
}) => presenter({
  className,
  onClick,
  balls,
  isSelected,
});

export default (props) => (
  <TubeContainer
    presenter={TubePresenter}
    {...props}
  />
);
