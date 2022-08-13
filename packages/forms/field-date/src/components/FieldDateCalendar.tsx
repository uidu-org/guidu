import moment from 'moment';
import React, { forwardRef } from 'react';
import DayPicker from 'react-day-picker';
import { FieldDateCalendarStatelessProps } from '../types';

function FieldDateCalendar({
  value,
  dayPickerProps,
  onDayChange,
}: FieldDateCalendarStatelessProps) {
  return (
    <DayPicker
      onDayClick={onDayChange}
      selectedDays={value && value !== '' && moment(value).toDate()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dayPickerProps}
    />
  );
}

const FieldDateCalendarStateless = forwardRef(
  (props: FieldDateCalendarStatelessProps, ref: any) => (
    <FieldDateCalendar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      forwardedRef={ref}
    />
  ),
);

export default FieldDateCalendarStateless;
