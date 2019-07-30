import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import {
  Copy,
  DownloadCloud,
  Edit2,
  MoreVertical,
  Printer,
  Settings,
  Trash,
} from 'react-feather';
import { Trigger } from '../../styled';

export default class More extends Component<any> {
  render() {
    const { onDownload, onPrint, onDuplicate } = this.props;
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
          <DropdownItem onClick={onDuplicate} elemBefore={<Edit2 size={14} />}>
            Rename view
          </DropdownItem>
          <DropdownItem onClick={onDuplicate} elemBefore={<Copy size={14} />}>
            Duplicate
          </DropdownItem>
          <DropdownItem
            onClick={onDuplicate}
            elemBefore={<Settings size={14} />}
          >
            Copy another view's configuration
          </DropdownItem>
          <DropdownItem
            onClick={onDownload}
            elemBefore={<DownloadCloud size={14} />}
          >
            Download CSV
          </DropdownItem>
          <DropdownItem
            onClick={onDuplicate}
            elemBefore={<Printer size={14} />}
          >
            Print view
          </DropdownItem>
          <DropdownItem onClick={onDuplicate} elemBefore={<Trash size={14} />}>
            Destroy view
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
