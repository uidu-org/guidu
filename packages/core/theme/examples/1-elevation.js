// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@uidu/button';
import {
  AtlaskitThemeProvider,
  elevation as AkElevations,
  themed,
} from '../src';

// the below adaptation may be written statically like ${akElevationMixins.e100}
const Box = styled.div`
  ${({ elevation }) => AkElevations[elevation]}
  background-color: ${() => themed({ light: 'white', dark: '#283447' })};
  border-radius: 3px;
  margin-bottom: 2em;
  min-width: 240px;
  padding: 16px 24px;
  text-align: center;
`;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

type Props = {};
type State = { themeMode: 'light' | 'dark' };

export default class extends Component<Props, State> {
  state = { themeMode: 'light' };

  switchTheme = () => {
    const { themeMode } = this.state;
    this.setState({
      themeMode: themeMode === 'light' ? 'dark' : 'light',
    });
  };

  render() {
    const { themeMode } = this.state;
    return (
      <AtlaskitThemeProvider mode={themeMode}>
        <div style={{ padding: 8 }}>
          <Button onClick={this.switchTheme}>Switch theme ({themeMode})</Button>
        </div>
        <Wrapper>
          <Box elevation="e100">Cards on a board</Box>
          <Box elevation="e200">Inline dialogs</Box>
          <Box elevation="e300">Modals</Box>
          <Box elevation="e400">Panels</Box>
          <Box elevation="e500">Flag messages</Box>
        </Wrapper>
      </AtlaskitThemeProvider>
    );
  }
}
