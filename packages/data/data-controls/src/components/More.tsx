import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Copy, DownloadCloud, MoreVertical } from 'react-feather';
import { Trigger } from '../styled';

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
          <DropdownItem
            onClick={onDownload}
            elemBefore={<DownloadCloud size={14} />}
          >
            Download CSV
          </DropdownItem>
          <DropdownItem onClick={onDuplicate} elemBefore={<Copy size={14} />}>
            Duplicate
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
