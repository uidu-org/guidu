import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import { Form } from '@uidu/form';
import { DateRange } from '@uidu/inputs';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { Calendar } from 'react-feather';
import { Trigger } from '../styled';
import DropdownMenu from '../utils/DropdownMenu';

export default class TimeFrame extends Component<any> {
  static defaultProps = {
    timeframes: ['1W', '2W', '1M', '3M', '1Y', '5Y'],
    handleDateChange: console.log,
  };

  render() {
    const { timeframes, handleDateChange, onChange } = this.props;

    return (
      <Fragment>
        <DropdownMenu
          trigger={
            <Trigger activeBg="#d0f0fd" className="btn">
              <Calendar strokeWidth={2} size={14} className="mr-2" />
              <span style={{ textTransform: 'initial' }}>Periodo</span>
            </Trigger>
          }
        >
          <DropdownItemGroup>
            {timeframes.map(timeframe => (
              <DropdownItem
                key={timeframe}
                onClick={e => {
                  e.preventDefault();
                  onChange(timeframe);
                }}
              >
                {timeframe}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
        <Form handleSubmit={() => {}} footerRenderer={() => {}}>
          <div className="d-flex">
            <DateRange
              dayPickerProps={{
                numberOfMonths: 1,
              }}
              name="f"
              layout="elementOnly"
              className="form-control form-control-sm shadow-none border"
              from={moment()
                .startOf('day')
                .toDate()}
              to={moment()
                .startOf('day')
                .toDate()}
              onChange={handleDateChange}
            />
          </div>
        </Form>
      </Fragment>
    );
  }
}
