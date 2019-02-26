// @flow
import styled from 'styled-components';
import { colors, themed } from '@uidu/theme';
import { getHeight, paddingUnitless, transition } from './constants';

const backgroundColor = themed({ light: colors.N0, dark: colors.DN600 });
const backgroundColorChecked = themed({ light: colors.N0, dark: colors.DN0 });
const backgroundColorDisabled = themed({ light: colors.N0, dark: colors.DN0 });

const getTransform = ({ isChecked, size }) =>
  isChecked ? `translateX(${getHeight({ size })}px)` : 'initial';

const getBackgroundColor = ({ isChecked, isDisabled, ...rest }) => {
  if (isDisabled) return backgroundColorDisabled(rest);
  if (isChecked) return backgroundColorChecked(rest);
  return backgroundColor(rest);
};

export default styled.span`
  background-color: ${getBackgroundColor};
  border-radius: 50%;
  bottom: ${2 * paddingUnitless}px;
  content: '';
  height: ${props => getHeight(props) - paddingUnitless * 2}px;
  left: ${2 * paddingUnitless}px;
  position: absolute;
  transform: ${getTransform};
  transition: ${transition};
  width: ${props => getHeight(props) - paddingUnitless * 2}px;
`;
