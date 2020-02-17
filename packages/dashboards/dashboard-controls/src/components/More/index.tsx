import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { PureComponent } from 'react';
import {
  Clipboard,
  Download,
  MoreVertical,
  Settings,
  Trash,
} from 'react-feather';
import { Trigger } from '../../styled';
import { MoreProps } from './types';

export default class More extends PureComponent<MoreProps> {
  static defaultProps = {
    actions: [],
  };

  render() {
    const { onDownload, onDuplicate, onRename, onDestroy } = this.props;
    const actions = [
      {
        text: 'Duplicate view',
        onClick: onDuplicate,
        icon: Clipboard,
      },
      {
        text: "Copy another view's configuration",
        onClick: onDuplicate,
        icon: Settings,
      },
      {
        text: 'Export .pdf',
        onClick: onDownload,
        icon: Download,
      },
      {
        text: 'Destroy view',
        onClick: onDestroy,
        icon: Trash,
      },
    ];
    return (
      <DropdownMenu
        className="mr-2"
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <MoreVertical strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          {actions.map(({ onClick, text, icon: Icon }) => (
            <DropdownItem
              key={text}
              onClick={onClick}
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
