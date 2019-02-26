// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer, { type DrawerWidth } from '../src';
import { widths } from '../src/constants';

type State = {
  width: DrawerWidth,
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    width: widths[0],
  };

  onNextClick = () => {
    const width =
      widths[(widths.indexOf(this.state.width) + 1) % widths.length];
    this.setState({
      width,
    });
  };

  render() {
    return (
      <Drawer isOpen width={this.state.width}>
        <div>
          <code>{this.state.width} width</code>
        </div>
        <div css={{ margin: '1rem 0' }}>
          <Button type="button" onClick={this.onNextClick}>
            Next width
          </Button>
        </div>
      </Drawer>
    );
  }
}
