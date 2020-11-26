import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import moment from 'moment';
import React, { forwardRef } from 'react';
import DayPicker from 'react-day-picker';
import { FieldDateCalendarStatelessProps } from '../types';
import pkg from '../version.json';

function FieldDateCalendar({
  value,
  dayPickerProps,
  onDayChange,
}: FieldDateCalendarStatelessProps) {
  return (
    <DayPicker
      {...dayPickerProps}
      onDayClick={onDayChange}
      selectedDays={value && value !== '' && moment(value).toDate()}
      modifiers={{
        ...(value && value !== ''
          ? {
              [styles.selected]: moment(value).toDate(),
            }
          : null),
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dayPickerProps}
    />
  );
}

const FieldDateCalendarStateless = forwardRef(
  (props: FieldDateCalendarStatelessProps, ref: any) => (
    <FieldDateCalendar {...props} forwardedRef={ref} />
  ),
);

export { FieldDateCalendarStateless as FieldDateCalendarStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldDate',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldDateCalendarStateless),
);
