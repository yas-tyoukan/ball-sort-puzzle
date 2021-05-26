import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BoardContext from '~/contexts/BoardContext';
import Board from '~/components/organisms/Board';
import SelectLevel from '~/components/organisms/SelectLevel';

const Root = styled.div`
  padding: 10px;
`;

export const AppPagePresenter = ({
  className,
  onClickReset,
}) => (
  <Root className={className}>
    <SelectLevel />
    <button type="button" onClick={onClickReset}>reset</button>
    <Board />
  </Root>
);

AppPagePresenter.propTypes = {
  className: PropTypes.string,
  onClickReset: PropTypes.func,
};

AppPagePresenter.defaultProps = {
  className: '',
  onClickReset: null,
};

const AppPageContainer = ({ className, presenter }) => {
  const { reset: onClickReset } = useContext(BoardContext);
  return presenter({
    className,
    onClickReset,
  });
};

export default (props) => (
  <AppPageContainer
    presenter={AppPagePresenter}
    {...props}
  />
);
