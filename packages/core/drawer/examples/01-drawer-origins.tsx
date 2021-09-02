import Button, { ButtonGroup } from '@uidu/button';
import React, { Component } from 'react';
import Drawer, { DrawerOrigin } from '../src';

type State = {
  origin: DrawerOrigin;
  isDrawerOpen: boolean;
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    origin: 'left' as DrawerOrigin,
    isDrawerOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  onClose = (...args) => {
    console.log('onClose', args);
    this.setState({
      isDrawerOpen: false,
    });
  };

  onCloseComplete = (...args) => console.log('onCloseComplete', args);

  render() {
    const { origin } = this.state;

    return (
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          onCloseComplete={this.onCloseComplete}
          isOpen={this.state.isDrawerOpen}
          size="medium"
          origin={origin}
        >
          <code>Drawer contents from {origin}</code>
        </Drawer>
        <ButtonGroup>
          {['left', 'top', 'right', 'bottom'].map((newOrigin) => (
            <Button
              type="button"
              className="mr-2 mb-2"
              onClick={() =>
                this.setState({ origin: newOrigin as DrawerOrigin }, () => {
                  this.openDrawer();
                })
              }
            >
              Open drawer <code>{newOrigin}</code>
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}
