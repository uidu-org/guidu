// @flow
import styled from 'styled-components';
import { colors, themed } from '@uidu/theme';
import { transition } from './constants';

const color = themed({ light: colors.N0, dark: colors.DN600 });
const disabledColor = themed({ light: colors.N70, dark: colors.DN30 });

const getFlexDirection = ({ isChecked }) => (isChecked ? 'row' : 'row-reverse');

export default styled.div`
  color: ${({ isDisabled }) => (isDisabled ? disabledColor : color)};
  display: flex;
  flex-direction: ${getFlexDirection};
  height: 100%;
  transition: ${transition};
  width: 100%;
`;
