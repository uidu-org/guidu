import { StyledInput } from '@uidu/field-base';
import Select from '@uidu/select';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { FieldTimeStatelessProps } from '../types';
import { generateTimeSlots } from '../utils';

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
  interval,
  start,
  end,
  fieldState,
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

  if (isFallback) {
    const timeSlots = generateTimeSlots({ interval, start, end });

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
    <StyledInput
      className={className}
      value={value}
      disabled={disabled}
      hasError={!!fieldState?.error}
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
