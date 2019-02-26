// @flow
import React, { PureComponent, type Node } from 'react';
import { ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import memoizeOne from 'memoize-one';
import createItemTheme from './map-navigation-theme-to-item-theme';
import type { Provided, RootTheme } from './types';
import { rootKey } from './util';

type Props = {
  children?: Node,
  isCollapsed: boolean,
  provided: Provided,
};

export default class WithRootTheme extends PureComponent<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  // We want to memoize the 'withOuterTheme' function based on the props that can affect it.
  // This achieves 2 things:
  // 1. A consistent function reference is passed to the ThemeProvider, which avoids it broadcasting
  //    updates to all components using the withTheme HOC
  // 2. The function reference will change if new 'provided' or 'isCollapsed' props are provided,
  //    which will force ThemeProvider to broadcast the update
  getWithOuterTheme = memoizeOne(
    (provided, isCollapsed) => (outerTheme: ?Object = {}): Object => {
      const theme: RootTheme = {
        isCollapsed: isCollapsed || false,
        provided,
      };

      return {
        ...outerTheme,
        [rootKey]: theme,
        [itemThemeNamespace]: createItemTheme(provided),
      };
    },
  );

  render() {
    const withOuterTheme = this.getWithOuterTheme(
      this.props.provided,
      this.props.isCollapsed,
    );
    return (
      <ThemeProvider theme={withOuterTheme}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
