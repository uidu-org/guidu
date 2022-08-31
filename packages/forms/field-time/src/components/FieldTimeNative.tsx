/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldTimeProps } from '../types';
import FieldTimeStateless from './FieldTimeStateless';

export default function FieldTimeNative({
  onChange = noop,
  name,
  value: defaultValue,
  rules,
  ...rest
}: FieldTimeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    onChange(name, e.target.value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldTimeStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
