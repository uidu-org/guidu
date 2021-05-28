import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import moment from 'moment';
import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
  containerClassName,
  wrapperClassName,
  dayPickerProps,
  forwardedRef,
  onDayChange,
  value = '',
  name,
  className = 'form-control',
  onChange,
  disabled,
  required,
  min,
  max,
}: FieldDateStatelessProps) {
  const [isFallback, setIsFallback] = useState(false);
  const element: RefObject<DayPickerInput | HTMLInputElement> = useRef();

  useEffect(() => {
    const test = document.createElement('input');

    try {
      test.type = 'date';
    } catch (e) {
      setIsFallback(true);
    }
  }, []);

  useImperativeHandle(forwardedRef, () => element.current);

  if (isFallback) {
    return (
      <DayPickerInput
        component={(props) => <input {...props} ref={element} id={id} />}
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

  console.log(value && value !== '' ? moment(value).format('YYYY-MM-DD') : '');

  return (
    <input
      id={id}
      value={value && value !== '' ? moment(value).format('YYYY-MM-DD') : ''}
      ref={element}
      type="date"
      name={name}
      className={className}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      disabled={disabled}
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
