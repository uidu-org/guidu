import Select from '@uidu/select';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { FieldTimeStatelessProps } from '../types';
import { generateTimeSlots } from '../utils';

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

function populateIntervals() {
  const options = [];
  for (var i = 0; i <= 23; i++) {
    options.push({ id: i, name: `${zero(i)}${i}` });
  }
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
  asSelect = false,
  ...rest
}: FieldTimeStatelessProps) {
  const intl = useIntl();
  const [isFallback, setIsFallback] = useState(asSelect);

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

  const timeSlots = useMemo(
    () => generateTimeSlots({ interval: 15, start: 0, end: 24 }),
    [],
  );

  if (isFallback) {
    return (
      <Select
        placeholder="00:00"
        name={name}
        options={timeSlots.map((time) => ({
          id: intl.formatTime(time, { hour: 'numeric', minute: 'numeric' }),
          name: intl.formatTime(time, { hour: 'numeric', minute: 'numeric' }),
        }))}
        // onChange={(name, value) => onChange(value)}
      />
    );
  }

  return (
    <input
      tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
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
      {...rest}
    />
  );
}

const FieldTimeStateless = forwardRef((props: FieldTimeStatelessProps, ref) => (
  <FieldTime {...props} forwardedRef={ref} />
));

export default FieldTimeStateless;
