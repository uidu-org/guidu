import { createTheme } from '@uidu/theme';

export interface ThemeItemTokens {
  backgroundColor: string;
}

export const ThemeItem = createTheme<ThemeItemTokens, {}>(() => {
  return {
    backgroundColor: '',
  };
});
