/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldTextProps } from '../types';
import FieldTextStateless from './FieldTextStateless';

export default function FieldText({
  name,
  onChange = () => {},
  value: defaultValue = '',
  rules,
  ...rest
}: FieldTextProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.currentTarget.value);
    onChange(name, e.currentTarget.value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldTextStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
