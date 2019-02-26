// @flow

import { createTheme } from '../utils/createTheme';

export type GlobalThemeProps = *;
export type GlobalThemeTokens = {
  mode: 'dark' | 'light',
};

export default createTheme<GlobalThemeTokens, GlobalThemeProps>(() => ({
  mode: 'light',
}));
