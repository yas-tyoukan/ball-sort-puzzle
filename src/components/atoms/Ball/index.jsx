import styled from 'styled-components';
import palette from './palette';

export default styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid #fff;
  background-color: ${({ color }) => palette[color]};
  border-radius: 50%;
`;
