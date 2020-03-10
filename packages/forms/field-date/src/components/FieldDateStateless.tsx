import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import moment from 'moment';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  // @ts-ignore
  formatDate,
  // @ts-ignore
  parseDate,
} from 'react-day-picker/moment';
import { FieldDateStatelessProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

function FieldDate({
  locale = 'it',
  displayFormat = 'LL',
  placeholder = `${formatDate(new Date(), 'LL', 'it')}`,
  inputClassName = 'form-control',
  value,
  containerClassName,
  wrapperClassName,
  dayPickerProps,
  forwardedRef,
  onDayChange,
}: FieldDateStatelessProps) {
  const element: RefObject<DayPickerInput> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  return (
    <DayPickerInput
      ref={element}
      classNames={{
        container: `DayPickerInput${
          containerClassName ? ` ${containerClassName}` : ''
        }`,
        overlayWrapper: `DayPickerInput-OverlayWrapper${
          wrapperClassName ? ` ${wrapperClassName}` : ''
        }`,
        overlay: 'DayPickerInput-Overlay',
      }}
      value={value && value !== '' ? moment(value).format(displayFormat) : ''}
      onDayChange={onDayChange}
      formatDate={formatDate}
      parseDate={parseDate}
      format={displayFormat}
      placeholder={placeholder}
      dayPickerProps={{
        locale,
        localeUtils: MomentLocaleUtils,
        showOutsideDays: true,
        enableOutsideDaysClick: true,
        todayButton: 'Go to Today',
        ...dayPickerProps,
      }}
      inputProps={{
        className: inputClassName,
      }}
    />
  );
}

const FieldDateStateless = forwardRef(
  (props: FieldDateStatelessProps, ref: any) => (
    <FieldDate {...props} forwardedRef={ref} />
  ),
);

export { FieldDateStateless as FieldDateStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldDate',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),
  })(FieldDateStateless),
);
