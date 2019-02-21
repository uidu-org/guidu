// @flow

import styled from 'styled-components';
import { colors, themed, withTheme } from '@atlaskit/theme';
import {
  getBorderRadius,
  getInnerStyles,
  BORDER_WIDTH,
} from '@atlaskit/avatar';

const EXCESS_INDICATOR_FONT_SIZE: {
  small: number,
  medium: number,
  large: number,
  xlarge: number,
} = {
  small: 10,
  medium: 11,
  large: 12,
  xlarge: 16,
};

const getBorderWidth = p =>
  p.isFocus && !p.isActive ? `${BORDER_WIDTH[p.size]}px` : 0;

export const Outer = withTheme(styled.button`
  ${getInnerStyles} background: 0;
`);

export const Inner = withTheme(styled.span`
  background-color: ${themed({ light: colors.N40, dark: colors.DN70 })};
  border-radius: ${getBorderRadius};
  align-items: center;
  box-shadow: 0 0 0 ${getBorderWidth} ${colors.B200};
  color: ${themed({ light: colors.N500, dark: colors.DN400 })};
  cursor: pointer;
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  font-size: ${props => EXCESS_INDICATOR_FONT_SIZE[props.size]}px;
  justify-content: center;
  transition: box-shadow 200ms;
`);
