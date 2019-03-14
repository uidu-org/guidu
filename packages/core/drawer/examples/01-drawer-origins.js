// @flow

import React, { Component } from 'react';
import Button from '@uidu/button';
import Drawer from '../src';

type State = {
  isDrawerOpen: boolean,
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    origin: 'left',
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
    const { origin } = this.state;

    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          onCloseComplete={this.onCloseComplete}
          isOpen={this.state.isDrawerOpen}
          size="medium"
          origin={origin}
        >
          <code>Drawer contents from {origin}</code>
        </Drawer>
        {['left', 'top', 'right', 'bottom'].map(newOrigin => (
          <Button
            type="button"
            className="mr-2 mb-2"
            onClick={() =>
              this.setState({ origin: newOrigin }, () => {
                this.openDrawer();
              })
            }
          >
            Open drawer <code>{newOrigin}</code>
          </Button>
        ))}
      </div>
    );
  }
}
