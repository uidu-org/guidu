import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { PureComponent } from 'react';
import { Trigger } from '../styled';
import { TimeFrameProps } from '../types';

export default class TimeFrame extends PureComponent<TimeFrameProps> {
  render() {
    const { timeframes, activeTimeFrame, onChange } = this.props;
    const currentTimeFrame = timeframes.find((t) => t.name === activeTimeFrame);

    return (
      <>
        <DropdownMenu
          trigger={
            <Trigger activeBg="#d0f0fd" className="btn">
              <span style={{ textTransform: 'initial' }}>
                {currentTimeFrame?.title ? currentTimeFrame.title : 'Custom'}
              </span>
            </Trigger>
          }
          boundariesElement="scrollParent"
        >
          <DropdownItemGroup>
            {timeframes.map((timeframe) => (
              <DropdownItem
                key={timeframe.name}
                onClick={(e) => {
                  e.preventDefault();
                  onChange(timeframe.name);
                }}
                isSelected={
                  currentTimeFrame?.name &&
                  timeframe.name === currentTimeFrame.name
                }
              >
                {timeframe.title}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      </>
    );
  }
}
