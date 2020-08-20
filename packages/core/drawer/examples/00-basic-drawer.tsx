import Button from '@uidu/button';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import Drawer from '../src';

type State = {
  isDrawerOpen: boolean;
};

export default class DrawersExample extends Component<{}, State> {
  state = {
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

  onCloseComplete = (...args: [HTMLElement]) =>
    console.log('onCloseComplete', args);

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          onCloseComplete={this.onCloseComplete}
          isOpen={this.state.isDrawerOpen}
          size="wide"
        >
          <ShellHeader>Titolo</ShellHeader>
          <ShellBody>
            <ShellMain>
              <ScrollableContainer>
                <Lorem count={100} />
              </ScrollableContainer>
            </ShellMain>
          </ShellBody>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
