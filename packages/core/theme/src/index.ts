import * as colorPalettes from './color-palettes';
import * as colors from './colors';
import GuiduThemeProvider from './components/GuiduThemeProvider';
import * as elevation from './elevation';
import * as typography from './typography';
import getTheme from './utils/getTheme';
import * as math from './utils/math';
import themed from './utils/themed';

export { default as Appearance } from './components/Appearance';
export * from './components/Reset';
export { default } from './components/Theme';
export {
  assistive,
  borderRadius,
  CHANNEL,
  codeFontFamily,
  DEFAULT_THEME_MODE,
  FLATTENED,
  focusRing,
  fontFamily,
  fontSize,
  fontSizeSmall,
  gridSize,
  layers,
  noFocusRing,
  skeletonShimmer,
  THEME_MODES,
  visuallyHidden,
} from './constants';
export { withTheme } from './hoc';
export * from './types';
export * from './utils/createTheme';
export {
  colors,
  colorPalettes,
  elevation,
  typography,
  math,
  getTheme,
  themed,
  GuiduThemeProvider,
};

// backwards-compatible export with old Guidu case
export const AtlasKitThemeProvider = GuiduThemeProvider;
