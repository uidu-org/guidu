// @flow

import { createTheme } from '@atlaskit/theme';

export type ThemeItemTokens = {
  backgroundColor: string,
};

export const ThemeItem = createTheme<ThemeItemTokens, {}>(() => {
  return {
    backgroundColor: '',
  };
});
