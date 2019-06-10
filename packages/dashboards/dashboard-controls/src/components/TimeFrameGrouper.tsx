import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Trigger } from '../styled';
import DropdownMenu from '../utils/DropdownMenu';

export default class TimeFrameGrouper extends Component<any> {
  static defaultProps = {
    groupers: ['day', 'week', 'month', 'year'],
  };

  render() {
    const { groupers, onChange, currentGrouper } = this.props;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn">
            <span style={{ textTransform: 'initial' }}>{currentGrouper}</span>
          </Trigger>
        }
      >
        <DropdownItemGroup>
          {groupers.map(timeframeGrouper => (
            <DropdownItem
              key={timeframeGrouper}
              onClick={e => {
                e.preventDefault();
                onChange(timeframeGrouper);
              }}
            >
              {timeframeGrouper}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
