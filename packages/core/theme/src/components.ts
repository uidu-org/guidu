/*
   This file will become the new index for theme once the codemod is mature enough.
   For now we're keeping the index file to avoid having to do a major change.
   Once the codemod is done and all the AK modules have been codeshifted, we delete index.js and rename this file to index + update all the imports
*/

export { default as Appearance } from './components/Appearance';
export { default as AtlaskitThemeProvider } from './components/AtlaskitThemeProvider';
// New API
export { Reset, ResetTheme } from './components/Reset';
export type { ResetThemeProps, ResetThemeTokens } from './components/Reset';
export { default } from './components/Theme';
export { withTheme } from './hoc';
export type { GlobalThemeTokens } from './types';
export { createTheme } from './utils/createTheme';
export type { ThemeProp } from './utils/createTheme';
export { default as getTheme } from './utils/getTheme';
export { default as themed } from './utils/themed';
