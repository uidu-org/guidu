import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldPhoneProps } from '../types';
import InputControl from './FieldPhoneStateless';

export default function FieldPhone({
  name,
  value: defaultValue,
  onChange = () => {},
  ...rest
}: FieldPhoneProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (value: string) => {
    field.onChange(value);
    onChange(field.name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <InputControl {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
