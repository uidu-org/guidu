import { Wrapper } from '@uidu/field-base';
import moment from 'moment';
import React, { forwardRef } from 'react';
import { FieldDateProps } from '../types';
import FieldDateCalendar from './FieldDateCalendar';
import FieldDateStateless from './FieldDateStateless';

function FieldDate({
  formatSubmit = 'YYYY-MM-DD',
  onSetValue,
  onChange,
  forwardedRef,
  withCalendar = false,
  name,
  ...rest
}: FieldDateProps & { forwardedRef: any }) {
  const handleFallbackChange = (date: any) => {
    const value = date ? moment(date).format(formatSubmit) : '';
    onSetValue(value);
    onChange(name, value);
  };

  const handleChange = (e) => {
    const date = e.target.value;
    const value = date ? moment(date).format(formatSubmit) : '';
    onSetValue(value);
    onChange(name, value);
  };

  const InputControl = withCalendar ? FieldDateCalendar : FieldDateStateless;

  return (
    <Wrapper {...rest}>
      <InputControl
        {...rest}
        name={name}
        onDayChange={handleFallbackChange}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldDateProps, ref) => (
  <FieldDate {...props} forwardedRef={ref} />
));
