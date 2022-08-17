import { useController, Wrapper } from '@uidu/field-base';
import moment from 'moment';
import React from 'react';
import { FieldDateProps } from '../types';
import FieldDateCalendar from './FieldDateCalendar';
import FieldDateStateless from './FieldDateStateless';

export default function FieldDate({
  formatSubmit = 'YYYY-MM-DD',
  onChange = () => {},
  withCalendar = false,
  name,
  defaultValue,
  ...rest
}: FieldDateProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
  });

  const handleFallbackChange = (date: any) => {
    const value = date ? moment(date).format(formatSubmit) : '';
    field.onChange(value);
    onChange(name, value);
  };

  const handleChange = (e) => {
    const date = e.target.value;
    const value = date ? moment(date).format(formatSubmit) : '';
    field.onChange(value);
    onChange(name, value);
  };

  const InputControl = withCalendar ? FieldDateCalendar : FieldDateStateless;

  return (
    <Wrapper {...rest} {...wrapperProps}>
      <InputControl
        {...rest}
        {...inputProps}
        onDayChange={handleFallbackChange}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
