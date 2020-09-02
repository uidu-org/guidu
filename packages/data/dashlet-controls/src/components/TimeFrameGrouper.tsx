import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { PureComponent } from 'react';
import { Trigger } from '../styled';
import { TimeFrameGrouperProps } from '../types';

export default class TimeFrameGrouper extends PureComponent<
  TimeFrameGrouperProps
> {
  render() {
    const { groupers, onChange, activeGrouper } = this.props;

    const currentGrouper =
      groupers.filter((g) => g.name === activeGrouper)[0] || groupers[0];

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn">
            <span style={{ textTransform: 'initial' }}>
              by {currentGrouper.title}
            </span>
          </Trigger>
        }
      >
        <DropdownItemGroup>
          {groupers.map((timeframeGrouper) => (
            <DropdownItem
              key={timeframeGrouper.name}
              onClick={(e) => {
                e.preventDefault();
                onChange(timeframeGrouper.name);
              }}
            >
              {timeframeGrouper.title}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
