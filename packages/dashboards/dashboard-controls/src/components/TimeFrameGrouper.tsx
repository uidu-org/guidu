import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Trigger } from '../styled';
import DropdownMenu from '../utils/DropdownMenu';

export default class TimeFrameGrouper extends Component<any> {
  static defaultProps = {
    groupers: ['day', 'week', 'month', 'year'],
  };

  render() {
    const { groupers } = this.props;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn">
            <span style={{ textTransform: 'initial' }}>Raggruppa</span>
          </Trigger>
        }
      >
        <DropdownItemGroup>
          {groupers.map(timeframe => (
            <DropdownItem key={timeframe}>{timeframe}</DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
