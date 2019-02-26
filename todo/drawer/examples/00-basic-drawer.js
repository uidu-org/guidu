// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';

type State = {
  isDrawerOpen: boolean,
};
export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  onClose = (
    ...args: [SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>, any]
  ) => {
    console.log('onClose', args);
    this.setState({
      isDrawerOpen: false,
    });
  };

  onCloseComplete = (...args: [HTMLElement]) =>
    console.log('onCloseComplete', args);

  render() {
    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          onCloseComplete={this.onCloseComplete}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <code>Drawer contents</code>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
