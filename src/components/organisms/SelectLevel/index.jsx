import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BoardContext from '~/contexts/BoardContext';

export const SelectLevelPresenter = ({
  className,
  value,
  options,
  onChange,
}) => (
  <div className={className}>
    <select value={value} onChange={onChange}>
      {options.map(({ label, value: v }) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  </div>
);

SelectLevelPresenter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func,
};

SelectLevelPresenter.defaultProps = {
  className: '',
  value: 0,
  options: [],
  onChange: null,
};

const SelectLevelContainer = ({ className, presenter }) => {
  const { currentLevel: value, questions, setCurrentLevel } = useContext(BoardContext);
  const options = questions.map((_, i) => ({ value: i, label: i }));
  const onChange = ({ target: { value: v } }) => {
    setCurrentLevel(v);
  };
  return presenter({
    className,
    value,
    options,
    onChange,
  });
};

export default (props) => (
  <SelectLevelContainer
    presenter={SelectLevelPresenter}
    {...props}
  />
);
