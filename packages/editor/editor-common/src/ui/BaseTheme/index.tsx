import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { Breakpoints, WidthConsumer } from '../WidthProvider';

export function mapBreakpointToLayoutMaxWidth(breakpoint: string) {
  switch (breakpoint) {
    case Breakpoints.M:
      return 760;
    case Breakpoints.L:
      return 850;
    default:
      return 680;
  }
}

type BaseThemeWrapperProps = {
  breakpoint: string;
  dynamicTextSizing?: boolean;
  children: React.ReactNode;
};
export function BaseThemeWrapper({
  breakpoint,
  dynamicTextSizing,
  children,
}: BaseThemeWrapperProps) {
  const memoizedTheme = useMemo(
    () => ({
      baseFontSize: dynamicTextSizing
        ? mapBreakpointToFontSize(breakpoint)
        : mapBreakpointToFontSize(Breakpoints.S),
      layoutMaxWidth: dynamicTextSizing
        ? mapBreakpointToLayoutMaxWidth(breakpoint)
        : mapBreakpointToLayoutMaxWidth(Breakpoints.S),
    }),
    [breakpoint, dynamicTextSizing],
  );

  return <ThemeProvider theme={memoizedTheme}>{children}</ThemeProvider>;
}

type BaseThemeProps = {
  children: React.ReactNode;
};

export function BaseTheme({ children }: BaseThemeProps) {
  return <WidthConsumer>{({ breakpoint }) => <>{children}</>}</WidthConsumer>;
}
