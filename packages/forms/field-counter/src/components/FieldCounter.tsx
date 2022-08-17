import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldCounterProps } from '../types';
import InputControl from './FieldCounterStateless';

export default function FieldCounter({
  name,
  value: defaultValue,
  ...rest
}: FieldCounterProps) {
  const { field, inputProps, wrapperProps, onChange } = useController({
    name,
    defaultValue,
    ...rest,
  });

  const handleChange = (value) => {
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <InputControl {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
