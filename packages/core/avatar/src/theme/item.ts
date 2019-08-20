import { createTheme } from '@uidu/theme';

export type ThemeItemTokens = {
  backgroundColor: string;
};

export const ThemeItem = createTheme(() => {
  return {
    backgroundColor: '',
  };
});
