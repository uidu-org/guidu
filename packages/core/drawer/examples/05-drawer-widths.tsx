import Button, { ButtonGroup } from '@uidu/button';
import React, { Component } from 'react';
import Drawer from '../src';
import { sizes } from '../src/constants';
import { DrawerSize } from '../src/types';

type State = {
  isDrawerOpen: boolean;
  size: DrawerSize;
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
    size: 'narrow' as DrawerSize,
  };

  openDrawer = (size: DrawerSize) => () =>
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
          tw="bg-red-500"
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
        <ButtonGroup tw="flex-wrap">
          {sizes.map((size) => (
            <Button
              onClick={this.openDrawer(size as DrawerSize)}
              type="button"
              key={size}
            >{`Open ${size} Drawer`}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}
