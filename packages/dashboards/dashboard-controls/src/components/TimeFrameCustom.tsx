import DropdownMenu, { DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Trigger } from '../styled';

export default class TimeFrameCustom extends Component<any> {
  render() {
    const {
      onChange,
      onAdd,
      dataViews,
      availableViews,
      currentView,
    } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn pr-5 mr-3" active={false}>
            ciao
            <span style={{ textTransform: 'initial' }}>Test1</span>
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup />
        <div className="border-top p-2 mt-2">
          <DropdownItemGroup className="d-flex" title="aggiungi" />
        </div>
      </DropdownMenu>
    );
  }
}
