/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { RadioProps } from '../types';
import RadioStateless from './RadioStateless';

export default function Radio({
  onChange = noop,
  value: defaultValue,
  name,
  rules,
  ...rest
}: RadioProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    field.onChange(value);
    onChange(name, value);
  };
  return (
    <Wrapper {...wrapperProps} label={null} floatLabel={false}>
      <RadioStateless
        {...rest}
        {...inputProps}
        value={name}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
