// @flow
import React, { PureComponent, type Node } from 'react';
import { ThemeProvider } from 'styled-components';
import memoizeOne from 'memoize-one';
import { isElectronMacKey } from './util';

type Props = {
  isElectronMac: boolean,
  children: Node,
};

const getTheme = memoizeOne((isElectronMac?: boolean) => ({
  [isElectronMacKey]: isElectronMac,
}));

export default class WithElectronTheme extends PureComponent<Props> {
  static defaultProps = {
    isElectronMac: false,
  };

  render() {
    const theme = getTheme(this.props.isElectronMac);
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}
