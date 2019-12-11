import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import {
  Clipboard,
  Download,
  Edit2,
  MoreVertical,
  Settings,
  Trash,
} from 'react-feather';
import { Trigger } from '../../styled';
import { MoreProps } from './types';

export default class More extends Component<MoreProps> {
  static defaultProps = {
    actions: [],
  };

  render() {
    const { onDownload, onDuplicate, onRename, onDestroy } = this.props;
    const actions = [
      {
        text: 'Rename view',
        onClick: onRename,
        icon: Edit2,
      },
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
        text: 'Export .csv',
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
