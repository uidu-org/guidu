declare module '@uidu/theme' {
  import * as React from 'react';

  export const borderRadius: () => number;
  export const codeFontFamily: () => string;
  export const noFocusRing: () => string;
  export const focusRing: (color: string, outlineWidth: number) => string;
  export const colors: Record<string, any>;
  export const elevation: any;
  export const fontFamily: any;
  export const fontSize: any;
  export const gridSize: any;
  export const layers: Record<string, () => number>;
  export const math: any;
  export const themed: any;
  export const typography: any;

  export class AtlaskitThemeProvider<ThemeProps> extends React.Component<
    ThemeProps
  > {}

  export type ThemeProp<ThemeTokens, ThemeProps> = (
    themeFn: (ThemeProps: ThemeProps) => ThemeTokens,
    themeProps: ThemeProps,
  ) => ThemeTokens;

  export interface Theme<ThemeTokens, ThemeProps> {
    Consumer: React.ComponentType<
      ThemeProps & {
        children: (tokens: ThemeTokens) => React.ReactElement<ThemeProps>;
      }
    >;
    Provider: React.ComponentType<{
      value?: ThemeProp<ThemeTokens, ThemeProps>;
      children?: React.ReactNode;
    }>;
  }

  export type GlobalThemeTokens = {
    mode: 'dark' | 'light';
  };

  const GlobalTheme: Theme<GlobalThemeTokens, any>;
  export default GlobalTheme;

  export const createTheme: <ThemeTokens, ThemeProps>(
    theme: (props: ThemeProps) => ThemeTokens,
  ) => Theme<ThemeTokens, ThemeProps>;
}
