import Dropdown from '@uidu/dropdown-menu';
import React, { Component } from 'react';

export default class DropdownMenu extends Component<any> {
  render() {
    const { trigger, children, shouldFitContainer } = this.props;
    return (
      <Dropdown
        trigger={trigger}
        position="bottom left"
        // className="mr-2"
        // boundariesElement="window"
        shouldFitContainer={shouldFitContainer}
      >
        {children}
      </Dropdown>
    );
  }
}
