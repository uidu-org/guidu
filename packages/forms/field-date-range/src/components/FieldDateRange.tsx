import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldDateRangeProps } from '../types';
import InputControl from './FieldDateRangeStateless';

export default function FieldDateRange({
  onChange = noop,
  name,
  value: defaultValue = { from: '', to: '' },
  ...rest
}: FieldDateRangeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  console.log('field', field);

  const handleChange = (value: any) => {
    console.log(value);
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <InputControl
        {...rest}
        {...inputProps}
        onChange={handleChange}
        // ref={this.element}
      />
    </Wrapper>
  );
}
