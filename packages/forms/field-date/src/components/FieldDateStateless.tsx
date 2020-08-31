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
import MomentLocaleUtils from 'react-day-picker/moment';
import { FieldDateStatelessProps } from '../types';
import pkg from '../version.json';

function FieldDate({
  id,
  locale = 'it',
  displayFormat = 'LL',
  placeholder = `${moment().format('LL')}`,
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
      component={(props) => <input {...props} id={id} />}
      ref={element}
      classNames={{
        container: `DayPickerInput d-block${
          containerClassName ? ` ${containerClassName}` : ''
        }`,
        overlayWrapper: `DayPickerInput-OverlayWrapper${
          wrapperClassName ? ` ${wrapperClassName}` : ''
        }`,
        overlay: 'DayPickerInput-Overlay',
      }}
      value={value && value !== '' ? moment(value).format(displayFormat) : ''}
      onDayChange={onDayChange}
      format={displayFormat}
      placeholder={placeholder}
      dayPickerProps={{
        locale,
        // @ts-ignore
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
  })(FieldDateStateless),
);
