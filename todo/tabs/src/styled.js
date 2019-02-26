// @flow
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

function lockSelectedColor(normal) {
  const selected = { light: colors.B400, dark: colors.B100 };

  return themed('status', { normal, selected });
}

const labelColor = lockSelectedColor({
  light: colors.N500,
  dark: colors.DN400,
});
const activeLabelColor = lockSelectedColor({
  light: colors.B500,
  dark: colors.B200,
});
const focusLabelColor = lockSelectedColor({
  light: colors.B100,
  dark: colors.B100,
});
const hoverLabelColor = lockSelectedColor({
  light: colors.B400,
  dark: colors.B75,
});

const underlineColor = lockSelectedColor({
  light: colors.N30,
  dark: colors.DN0,
});
const underlineHeight = '2px';

/*
  NOTE min-height attribute
  FF http://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox
*/

// Tabs
export const Tabs = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 0%; /* See min-height note */
`;

// TabPane
export const TabPane = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 0%; /* See min-height note */
  padding-left: ${gridSize}px;
  padding-right: ${gridSize}px;
`;

// TabNav

export const NavWrapper = styled.div`
  position: relative;
`;

export const Nav = styled.div`
  display: flex;
  font-weight: 500;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NavLine = styled.span`
  background-color: ${underlineColor};
  border-radius: ${underlineHeight};
  bottom: 0;
  content: '';
  height: ${underlineHeight};
  left: ${gridSize}px;
  margin: 0;
  position: absolute;
  right: ${gridSize}px;
  width: inherit;
`;

export const NavItem = styled.div`
  color: ${labelColor};
  cursor: pointer;
  line-height: 1.8;
  margin: 0;
  padding: ${math.divide(gridSize, 2)}px ${gridSize}px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${hoverLabelColor};
  }
  &:active,
  &:active::before {
    color: ${activeLabelColor};
  }

  &:focus {
    border-radius: ${borderRadius}px;
    box-shadow: 0 0 0 2px ${focusLabelColor} inset;
    outline: none;
  }
`;
