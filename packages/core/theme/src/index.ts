import * as colorPalettes from './color-palettes';
import * as colors from './colors';
import AtlaskitThemeProvider from './components/AtlaskitThemeProvider';
import * as elevation from './elevation';
import * as typography from './typography';
import getTheme from './utils/getTheme';
import * as math from './utils/math';
import themed from './utils/themed';

export { default as Appearance } from './components/Appearance';
export {
  Reset,
  ResetTheme,
  ResetThemeProps,
  ResetThemeTokens,
} from './components/Reset';
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
export {
  AtlaskitThemeProps,
  colorPaletteType,
  CustomThemeProps,
  DefaultValue,
  Elevation,
  GlobalThemeTokens,
  NoThemeProps,
  Theme,
  ThemedValue,
  ThemeModes,
  ThemeProps,
} from './types';
export { createTheme, ThemeProp } from './utils/createTheme';
export {
  colors,
  colorPalettes,
  elevation,
  typography,
  math,
  getTheme,
  themed,
  AtlaskitThemeProvider,
};

// backwards-compatible export with old Atlaskit case
export const AtlasKitThemeProvider = AtlaskitThemeProvider;
