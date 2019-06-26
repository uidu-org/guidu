import { fontSize } from '@uidu/theme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Breakpoints, WidthConsumer } from '../WidthProvider';

function mapBreakpointToFontSize(breakpoint: string) {
  switch (breakpoint) {
    case Breakpoints.M:
      return fontSize() + 2;
    case Breakpoints.L:
      return fontSize() + 4;
    default:
      return fontSize();
  }
}

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

export function BaseTheme({
  children,
  dynamicTextSizing,
}: {
  children: React.ReactNode;
  dynamicTextSizing?: boolean;
}) {
  return (
    <WidthConsumer>
      {({ breakpoint }) => (
        <ThemeProvider
          theme={{
            baseFontSize: dynamicTextSizing
              ? mapBreakpointToFontSize(breakpoint)
              : mapBreakpointToFontSize(Breakpoints.S),
            layoutMaxWidth: dynamicTextSizing
              ? mapBreakpointToLayoutMaxWidth(breakpoint)
              : mapBreakpointToLayoutMaxWidth(Breakpoints.S),
          }}
        >
          <>{children}</>
        </ThemeProvider>
      )}
    </WidthConsumer>
  );
}
