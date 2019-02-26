// @flow

import React, { createContext, type ComponentType, type Node } from 'react';

export type ThemeProp<ThemeTokens = {}, ThemeProps = *> = (
  (ThemeProps) => ThemeTokens,
  ThemeProps,
) => ThemeTokens;

export function createTheme<ThemeTokens, ThemeProps>(
  defaultThemeFn: ThemeProps => ThemeTokens,
): {
  Consumer: ComponentType<
    ThemeProps & {
      children: ThemeTokens => Node,
    },
  >,
  Provider: ComponentType<{
    children?: Node,
    value?: ThemeProp<ThemeTokens, ThemeProps>,
  }>,
} {
  const emptyThemeFn = (tokens, props) => tokens(props);
  const ThemeContext = createContext(defaultThemeFn);

  function Consumer(props: ThemeProps & { children: ThemeTokens => Node }) {
    const { children, ...themeProps } = props;
    return (
      <ThemeContext.Consumer>
        {theme => {
          const themeFn = theme || emptyThemeFn;
          return props.children(themeFn(themeProps));
        }}
      </ThemeContext.Consumer>
    );
  }

  function Provider(props: {
    children?: Node,
    value?: ThemeProp<ThemeTokens, ThemeProps>,
  }) {
    return (
      <ThemeContext.Consumer>
        {themeFn => {
          const valueFn = props.value || emptyThemeFn;
          const mixedFn = (themeProps: ThemeProps) =>
            valueFn(themeFn, themeProps);
          return (
            <ThemeContext.Provider value={mixedFn}>
              {props.children}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  return { Consumer, Provider };
}
