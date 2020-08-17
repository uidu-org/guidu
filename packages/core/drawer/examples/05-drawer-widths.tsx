import Button from '@uidu/button';
import React, { Component } from 'react';
import Drawer from '../src';
import type { DrawerWidth } from '../src/components/types';
import { sizes } from '../src/constants';

type State = {
  isDrawerOpen: boolean;
  size: DrawerWidth;
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
    size: 'narrow',
  };

  openDrawer = (size: DrawerWidth) => () =>
    this.setState({
      isDrawerOpen: true,
      size,
    });

  closeDrawer = () =>
    this.setState({
      isDrawerOpen: false,
    });

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          size={this.state.size}
        >
          <code
            style={{
              textTransform: 'capitalize',
            }}
          >{`${this.state.size} drawer contents`}</code>
        </Drawer>
        {sizes.map((size) => (
          <Button
            onClick={this.openDrawer(size)}
            type="button"
            key={size}
            className="mr-2 mb-2"
          >{`Open ${size} Drawer`}</Button>
        ))}
      </div>
    );
  }
}
