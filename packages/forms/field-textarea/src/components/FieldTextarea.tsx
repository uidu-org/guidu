import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldTextareaProps } from '../types';
import InputControl from './FieldTextareaStateless';

export default function FieldTextarea({
  onChange = () => {},
  name,
  value: defaultValue,
  ...rest
}: FieldTextareaProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <InputControl {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
