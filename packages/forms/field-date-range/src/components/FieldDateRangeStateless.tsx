import { FieldDateStateless } from '@uidu/field-date';
import moment from 'moment';
import React, { RefObject, useRef, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { formatDate } from 'react-day-picker/moment';
import { ArrowRight } from 'react-feather';
import { Helmet } from 'react-helmet';
import { FieldDateRangeStatelessProps } from '../types';

function FieldDateRangeStateless({
  locale = 'it',
  displayFormat = 'L',
  placeholders = {
    from: undefined, // `${formatDate(new Date(), 'LL', 'it')}`,
    to: undefined, // `${formatDate(new Date(), 'LL', 'it')}`,
  },
  from: propFrom,
  to: propTo,
  className = 'px-0 InputFromTo d-flex form-control align-items-center',
  onChange,
  ...rest
}: FieldDateRangeStatelessProps) {
  const fromElement: RefObject<DayPickerInput> = useRef(null);
  const toElement: RefObject<DayPickerInput> = useRef(null);
  const [from, setFrom] = useState(propFrom);
  const [to, setTo] = useState(propTo);

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      toElement.current.getDayPicker().showMonth(from);
    }
  };

  const handleFromChange = (newFrom) => {
    // Change the from date and focus the "to" input field
    setFrom(newFrom);
    onChange({ from: newFrom, to });
  };

  const handleToChange = (newTo) => {
    setTo(newTo);
    onChange({ from, to: newTo });
    showFromMonth();
    toElement.current.getInput().blur();
  };

  const modifiers = { start: from, end: to };

  return (
    <div className={className} tw="flex items-center space-x-3">
      <FieldDateStateless
        ref={fromElement}
        value={from}
        placeholder={placeholders.from}
        wrapperClassName="position-static"
        inputClassName="form-control shadow-none border-0 text-center"
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick: () => {
            toElement.current.getInput().focus();
          },
        }}
        onDayChange={handleFromChange}
        displayFormat={displayFormat}
        {...rest}
      />
      <ArrowRight size={16} tw="flex-shrink-0" />
      <FieldDateStateless
        ref={toElement}
        value={to}
        placeholder={placeholders.to}
        wrapperClassName="position-static"
        inputClassName="form-control shadow-none border-0 text-center"
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { before: from },
          modifiers,
          month: from,
          fromMonth: from,
          numberOfMonths: 2,
        }}
        onDayChange={handleToChange}
        displayFormat={displayFormat}
        {...rest}
      />
      <Helmet>
        <style>
          {`
              .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
              }
              .InputFromTo .DayPickerInput input:focus {
                color: red;
              }
              .InputFromTo .DayPickerInput input {
                max-width: 140px;
                height: calc(100% - 2px);
              }
              .InputFromTo .DayPicker-Day {
                border-radius: 0 !important;
              }
              .InputFromTo .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
              }
              .InputFromTo .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
              }
              .InputFromTo .DayPickerInput-Overlay {
                width: 100%;
              }
            `}
        </style>
      </Helmet>
    </div>
  );
}

export default FieldDateRangeStateless;
