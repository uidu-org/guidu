import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldDateRangeProps } from '../types';
import InputControl from './FieldDateRangeStateless';

export default function FieldDateRange({
  formatSubmit = 'YYYY-MM-DD',
  onChange = () => {},
  name,
  value: defaultValue,
  ...rest
}: FieldDateRangeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (value: any) => {
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
