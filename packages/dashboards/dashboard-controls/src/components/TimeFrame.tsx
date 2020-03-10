import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import { FieldDateRangeStateless } from '@uidu/field-date-range';
import React, { Component, Fragment } from 'react';
import { Calendar } from 'react-feather';
import { Trigger } from '../styled';
import { TimeFrameProps } from '../types';
import DropdownMenu from '../utils/DropdownMenu';

export default class TimeFrame extends Component<TimeFrameProps> {
  render() {
    const {
      timeframes,
      activeTimeFrame,
      handleDateChange,
      onChange,
      from,
      to,
    } = this.props;
    console.log(this.props);

    const currentTimeFrame =
      typeof activeTimeFrame == 'string'
        ? timeframes.filter(t => t.key === activeTimeFrame)[0]
        : activeTimeFrame;

    return (
      <Fragment>
        <DropdownMenu
          trigger={
            <Trigger activeBg="#d0f0fd" className="btn">
              <Calendar strokeWidth={2} size={14} className="mr-2" />
              <span style={{ textTransform: 'initial' }}>
                {currentTimeFrame.key ? currentTimeFrame.name : 'Custom'}
              </span>
            </Trigger>
          }
        >
          <DropdownItemGroup>
            {timeframes.map(timeframe => (
              <DropdownItem
                key={timeframe.key}
                onClick={e => {
                  e.preventDefault();
                  onChange(timeframe.key);
                }}
                isSelected={
                  currentTimeFrame.key && timeframe.key === currentTimeFrame.key
                }
              >
                {timeframe.name}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
        <div className="d-flex">
          <FieldDateRangeStateless
            from={from.toDate()}
            to={to.toDate()}
            onChange={handleDateChange}
            displayFormat="DD/MM/YY"
          />
        </div>
      </Fragment>
    );
  }
}
