import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldRangeProps } from '../types';
import FieldRangeStateless from './FieldRangeStateless';

export default function FieldRange({
  name,
  value: defaultValue = '',
  onChange = () => {},
  rules,
  ...rest
}: FieldRangeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
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
