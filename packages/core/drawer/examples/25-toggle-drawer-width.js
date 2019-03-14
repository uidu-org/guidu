// @flow

import React, { Component } from 'react';
import Button from '@uidu/button';
import Drawer, { type DrawerWidth } from '../src';
import { sizes } from '../src/constants';

type State = {
  size: DrawerWidth,
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    size: sizes[0],
  };

  onNextClick = () => {
    const size = sizes[(sizes.indexOf(this.state.size) + 1) % sizes.length];
    this.setState({
      size,
    });
  };

  render() {
    return (
      <Drawer isOpen size={this.state.size}>
        <div>
          <code>{this.state.size} size</code>
        </div>
        <div css={{ margin: '1rem 0' }}>
          <Button type="button" onClick={this.onNextClick}>
            Next size
          </Button>
        </div>
      </Drawer>
    );
  }
}
