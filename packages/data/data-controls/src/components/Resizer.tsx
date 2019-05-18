import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Maximize2 } from 'react-feather';
import { Trigger } from '../styled';

export default class Resizer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <Maximize2 strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup title="Select a row height">
          <DropdownItem>Short</DropdownItem>
          <DropdownItem>Medium</DropdownItem>
          <DropdownItem>Tall</DropdownItem>
          <DropdownItem>Extra</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
