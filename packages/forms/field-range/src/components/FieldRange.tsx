import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldRangeProps } from '../types';
import FieldRangeStateless from './FieldRangeStateless';

export default function FieldRange({
  name,
  value: defaultValue,
  onChange = () => {},
  ...rest
}: FieldRangeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (value) => {
    const formattedValue = parseFloat(value);
    field.onChange(formattedValue);
    onChange(name, formattedValue);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldRangeStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
