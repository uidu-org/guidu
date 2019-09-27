declare module '@uidu/theme/components' {
  import * as React from 'react';

  export type GlobalThemeTokens = {
    mode: 'dark' | 'light';
  };

  const GlobalTheme: Theme<GlobalThemeTokens, any>;
  export default GlobalTheme;

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

  export const createTheme: <ThemeTokens, ThemeProps>(
    theme: (props: ThemeProps) => ThemeTokens,
  ) => Theme<ThemeTokens, ThemeProps>;

  export const themed: any;

  export class AtlaskitThemeProvider<ThemeProps> extends React.Component<
    ThemeProps
  > {}

  export function withTheme<Props extends Object = {}>(
    InnerComponent: React.ComponentType<Props>,
  ): React.ComponentType<Props>;
}
