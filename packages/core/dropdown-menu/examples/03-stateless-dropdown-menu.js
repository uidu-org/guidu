// @flow

import React, { Component } from 'react';
import {
  DropdownMenuStateless,
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '../src';

type State = {
  isDropdownOpen: boolean,
};

export default class StatelessMenuExample extends Component<{}, State> {
  state = { isDropdownOpen: false };

  render() {
    return (
      <div>
        <DropdownMenuStateless
          isOpen={this.state.isDropdownOpen}
          onOpenChange={attrs => {
            this.setState({ isDropdownOpen: attrs.isOpen });
          }}
          trigger="Choose"
          triggerType="button"
          isMenuFixed
        >
          <DropdownItemGroupRadio id="cities">
            <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
            <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>
      </div>
    );
  }
}
