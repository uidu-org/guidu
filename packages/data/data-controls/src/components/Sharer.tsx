import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Share } from 'react-feather';
import { Trigger } from '../styled';

export default class Sharer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <Share strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          <DropdownItem>Create a shareable view</DropdownItem>
          <DropdownItem>Create a form view</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
