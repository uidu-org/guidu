import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Select from '@uidu/select';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FieldTimeStatelessProps } from '../types';
import pkg from '../version.json';

function zero(a) {
  return a < 10 ? '0' : '';
}

function populateHours() {
  const options = [];
  for (var i = 0; i <= 23; i++) {
    options.push({ id: i, name: `${zero(i)}${i}` });
  }
  return options;
}

function populateMinutes() {
  const options = [];
  for (var i = 0; i <= 59; i++) {
    options.push({ id: i, name: `${zero(i)}${i}` });
  }
  return options;
}

function FieldTime({
  name,
  className,
  forwardedRef,
  onChange,
  value = '',
  required,
  min,
  max,
  disabled,
}: FieldTimeStatelessProps) {
  const [isFallback, setIsFallback] = useState(false);

  const element = useRef(null);

  useEffect(() => {
    const test = document.createElement('input');

    try {
      test.type = 'time';
    } catch (e) {
      setIsFallback(true);
    }
  }, []);

  useImperativeHandle(forwardedRef, () => element.current);

  if (isFallback) {
    return (
      <div className="d-flex align-items-center form-control px-2">
        <Select
          styles={{
            control: (base) => ({
              width: 32,
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '.75rem 0',
              justifyContent: 'center',
            }),
            menu: (base) => ({
              ...base,
              width: 100,
            }),
          }}
          placeholder="00"
          name="hours"
          options={populateHours()}
          layout="elementOnly"
          isClearable={false}
          components={{
            DropdownIndicator: null,
          }}
        />
        <span>:</span>
        <Select
          styles={{
            control: (base) => ({
              width: 32,
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '.75rem 0',
              justifyContent: 'center',
            }),
            menu: (base) => ({
              ...base,
              width: 100,
            }),
          }}
          placeholder="00"
          name="minutes"
          options={populateMinutes()}
          layout="elementOnly"
          isClearable={false}
          components={{
            DropdownIndicator: null,
          }}
        />
      </div>
    );
  }

  return (
    <input
      tw="shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-secondary), .4)]"
      className={className}
      value={value}
      disabled={disabled}
      ref={element}
      type="time"
      name={name}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
    />
  );
}

const FieldTimeStateless = forwardRef((props: FieldTimeStatelessProps, ref) => (
  <FieldTime {...props} forwardedRef={ref} />
));

export { FieldTimeStateless as FieldTimeStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumber',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldTimeStateless),
);
