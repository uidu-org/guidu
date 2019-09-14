import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { MoreVertical } from 'react-feather';
import { Trigger } from '../../styled';

export default class More extends Component<any> {
  static defaultProps = {
    actions: [],
  };

  render() {
    const { onDownload, actions } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <MoreVertical strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          {actions.map(({ download, onClick, text, icon: Icon }) => (
            <DropdownItem
              onClick={download ? onDownload : onClick}
              elemBefore={<Icon size={14} />}
            >
              {text}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
