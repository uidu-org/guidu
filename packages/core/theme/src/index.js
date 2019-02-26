// @flow
import { css } from 'styled-components';
import * as colors from './colors';
import * as elevation from './elevation';
import * as typography from './typography';
import * as math from './utils/math';
import getTheme from './utils/getTheme';
import themed from './utils/themed';
import AtlaskitThemeProvider from './components/AtlaskitThemeProvider';

export {
  colors,
  elevation,
  typography,
  math,
  getTheme,
  themed,
  AtlaskitThemeProvider,
};
export { default as Appearance } from './components/Appearance';

// backwards-compatible export with old Atlaskit case
export const AtlasKitThemeProvider = AtlaskitThemeProvider;

/*
  These theme values are expressed as functions so that if we decide to make
  them dependent on props in the future, it wouldn't require a significant
  refactor everywhere they are being used.
*/
export const borderRadius = () => 3;
export const gridSize = () => 8;
export const fontSize = () => 14;
export const fontSizeSmall = () => 11;
export const fontFamily = () =>
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
export const codeFontFamily = () =>
  '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Consolas, Courier, monospace';

export const focusRing = (
  color = colors.B100,
  outlineWidth = gridSize() / 4,
) => `
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px ${outlineWidth}px ${color};
  }
`;

export const noFocusRing = () => `
  box-shadow: none;
`;

export const layers = {
  card: () => 100,
  dialog: () => 200,
  navigation: () => 300,
  layer: () => 400,
  blanket: () => 500,
  modal: () => 510,
  flag: () => 600,
  spotlight: () => 700,
  tooltip: () => 800,
};

export const assistive = () => css`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

// New API
export * from './components/Reset';
export { default } from './components/Theme';
export * from './hoc';
export * from './utils/createTheme';
