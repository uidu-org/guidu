/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldCounterProps } from '../types';
import FieldCounterStateless from './FieldCounterStateless';

export default function FieldCounter({
  name,
  value: defaultValue = '',
  onChange = noop,
  rules = {},
  ...rest
}: FieldCounterProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(Number(e.target.value));
    onChange(name, Number(e.target.value));
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldCounterStateless
        {...rest}
        {...inputProps}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
