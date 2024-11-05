import Button from '@uidu/button';
import React, { Component } from 'react';
import Drawer from '../src';

type State = {
  isDrawerOpen: boolean;
};

export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: true,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
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
          size="wide"
        >
          <div id="drawer-contents">
            <p id="paragraph">
              The drawer should not set a new stacking context by using a
              transform CSS property as this causes issues for fixed positioned
              elements such as @uidu/dropdown-menu.
            </p>
            {/* The position here is used by the withDropdown integration test. */}
          </div>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
