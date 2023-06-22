/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldTextareaProps } from '../types';
import FieldTextareaStateless from './FieldTextareaStateless';

export default function FieldTextarea({
  onChange = noop,
  name,
  value: defaultValue = '',
  rules = {},
  ...rest
}: FieldTextareaProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
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
      <FieldTextareaStateless
        {...rest}
        {...inputProps}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
