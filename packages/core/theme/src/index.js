// @flow
import * as colors from './colors';
import AtlaskitThemeProvider from './components/AtlaskitThemeProvider';
import * as elevation from './elevation';
import * as typography from './typography';
import getTheme from './utils/getTheme';
import * as math from './utils/math';
import themed from './utils/themed';

export { default as Appearance } from './components/Appearance';
// New API
export * from './components/Reset';
export { default } from './components/Theme';
export * from './constants';
export * from './hoc';
export * from './utils/createTheme';
export {
  colors,
  elevation,
  typography,
  math,
  getTheme,
  themed,
  AtlaskitThemeProvider,
};

// backwards-compatible export with old Atlaskit case
export const AtlasKitThemeProvider = AtlaskitThemeProvider;
