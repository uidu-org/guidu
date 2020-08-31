import { N0 } from '@uidu/theme/colors';
import { fontSize, gridSize } from '@uidu/theme/constants';
import { e200 } from '@uidu/theme/elevation';
import styled from 'styled-components';

const gridSizeUnitless = gridSize();

const ButtonWrapper = styled.div`
  ${e200};
  background-color: ${N0};
  border-radius: ${gridSizeUnitless / 2 - 1}px;
  box-sizing: border-box;
  font-size: ${fontSize()}px;
  width: ${gridSizeUnitless * 4}px;
  z-index: 200;

  &:last-child {
    margin-left: ${gridSizeUnitless / 2}px;
  }
`;

ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
