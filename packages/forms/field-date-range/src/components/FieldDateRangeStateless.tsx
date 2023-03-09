import { FieldDateStateless } from '@uidu/field-date';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import moment from 'moment';
import React, { ChangeEvent, RefObject, useCallback, useRef } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { ArrowRight } from 'react-feather';
import { FieldDateRangeStatelessProps } from '../types';

function FieldDateRangeStateless({
  locale = 'it',
  displayFormat = 'yyyy-MM-dd',
  formatSubmit = 'yyyy-MM-dd',
  placeholders = {
    from: undefined, // `${formatDate(new Date(), 'LL', 'it')}`,
    to: undefined, // `${formatDate(new Date(), 'LL', 'it')}`,
  },
  from: propFrom,
  to: propTo,
  className = 'px-0 InputFromTo d-flex form-control align-items-center',
  onChange,
  value,
  ...rest
}: FieldDateRangeStatelessProps) {
  console.log(rest);
  const fromElement: RefObject<HTMLInputElement> = useRef(null);
  const toElement: RefObject<HTMLInputElement> = useRef(null);
  const { from, to } = value;

  const today = new Date();

  const parseValue = useCallback(
    (value: string) => parse(value, displayFormat, today, { locale }),
    [displayFormat, today, locale],
  );

  const formatValue = useCallback(
    (value: string) => format(value, formatSubmit),
    [formatSubmit],
  );

  const dateFrom = parse(from, formatSubmit, new Date());
  const dateTo = parse(to, formatSubmit, new Date());

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      toElement.current.getDayPicker().showMonth(from);
    }
  };

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = parseValue(e.target.value);
    if (!isValid(date)) {
      return onChange({ from: undefined, to: undefined });
    }
    if (dateTo && isAfter(date, dateTo)) {
      onChange({ from: dateTo, to: date });
    } else {
      onChange({ from: date, to: dateTo });
    }
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = parseValue(e.target.value);
    if (!isValid(date)) {
      return onChange({ from: selectedRange?.from, to: undefined });
    }
    if (dateFrom && isBefore(date, dateFrom)) {
      onChange({ from: date, to: dateFrom });
    } else {
      onChange({ from: dateFrom, to: date });
    }
    // onChange({ ...value, to: formatValue(newTo) });
    showFromMonth();
    toElement.current.getInput().blur();
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    console.log('range', range);
    onChange({
      from:
        range?.from && isValid(range.from)
          ? formatValue(range.from)
          : undefined,
      to: range?.to && isValid(range.to) ? formatValue(range.to) : undefined,
    });
  };

  const modifiers = { start: dateFrom, end: dateTo };

  // const fromDate = parse(from, formatSubmit, new Date());
  // const fromDate = parse(from, formatSubmit, new Date());

  console.log('from', from);

  console.log('dateFrom', dateFrom);
  console.log('dateTo', dateTo);

  // console.log(parse(from, formatSubmit, new Date()));

  return (
    <div className={className} tw="flex flex-col divide-y">
      <div tw="flex items-center space-x-3 py-3">
        <FieldDateStateless
          ref={fromElement}
          value={from}
          placeholder={placeholders.from}
          wrapperClassName="position-static"
          inputClassName="form-control shadow-none border-0 text-center"
          onChange={handleFromChange}
          dayPickerProps={{
            selectedDays: [dateFrom, { from: dateFrom, to: dateTo }],
            disabledDays: { after: dateTo },
            toMonth: dateTo,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => {
              toElement.current.getInput().focus();
            },
          }}
          formatSubmit={formatSubmit}
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
          onChange={handleToChange}
          dayPickerProps={{
            selectedDays: [dateFrom, { from: dateFrom, to: dateTo }],
            disabledDays: { before: dateFrom },
            modifiers,
            month: dateFrom,
            fromMonth: dateFrom,
            numberOfMonths: 2,
          }}
          formatSubmit={formatSubmit}
          displayFormat={displayFormat}
          {...rest}
        />
      </div>
      <div tw="py-3">
        <DayPicker
          mode="range"
          selected={{ from: dateFrom, to: dateTo }}
          onSelect={handleRangeSelect}
        />
      </div>
      {/* <Helmet>
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
      </Helmet> */}
    </div>
  );
}

export default FieldDateRangeStateless;
