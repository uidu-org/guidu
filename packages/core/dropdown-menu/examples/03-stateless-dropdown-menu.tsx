import React, { Component } from 'react';
import DropdownMenu from '../src';

type State = {
  isDropdownOpen: boolean;
};

export default class StatelessMenuExample extends Component<{}, State> {
  state = { isDropdownOpen: false };

  render() {
    return (
      <div>
        <DropdownMenu
          isOpen={this.state.isDropdownOpen}
          onOpenChange={(attrs) => {
            this.setState({ isDropdownOpen: attrs.isOpen });
          }}
          trigger="Choose"
        >
          <div>Content</div>
          {/* <DropdownItemGroupRadio id="cities">
            <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
            <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
          </DropdownItemGroupRadio> */}
        </DropdownMenu>
      </div>
    );
  }
}
