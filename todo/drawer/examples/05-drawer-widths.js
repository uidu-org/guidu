// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';

type Widths = 'narrow' | 'medium' | 'wide' | 'full';
type State = {
  isDrawerOpen: boolean,
  width: Widths,
};
export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
    width: 'narrow',
  };
  widths = ['narrow', 'medium', 'wide', 'full'];

  openDrawer = (width: Widths) => () =>
    this.setState({
      isDrawerOpen: true,
      width,
    });

  closeDrawer = () =>
    this.setState({
      isDrawerOpen: false,
    });

  render() {
    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          width={this.state.width}
        >
          <code
            css={{
              textTransform: 'capitalize',
            }}
          >{`${this.state.width} drawer contents`}</code>
        </Drawer>
        {this.widths.map(width => (
          <Button
            onClick={this.openDrawer(width)}
            type="button"
            key={width}
            css={{
              marginRight: '1rem',
            }}
          >{`Open ${width} Drawer`}</Button>
        ))}
      </div>
    );
  }
}
