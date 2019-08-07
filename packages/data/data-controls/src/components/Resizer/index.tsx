import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Maximize2 } from 'react-feather';
import { Trigger } from '../../styled';

export default class Resizer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onResize } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <Maximize2 strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onResize(36);
            }}
          >
            Compatta
          </DropdownItem>
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onResize(48);
            }}
          >
            Predefinita
          </DropdownItem>
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onResize(60);
            }}
          >
            Normale
          </DropdownItem>
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onResize(72);
            }}
          >
            Extra
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
