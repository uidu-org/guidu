/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { NumberFormatValues } from 'react-number-format';
import { FieldNumberProps } from '../types';
import FieldNumberStateless from './FieldNumberStateless';

export default function FieldNumber({
  name,
  value: defaultValue,
  onChange = () => {},
  rules,
  ...rest
}: FieldNumberProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (values: NumberFormatValues) => {
    const { value } = values;
    field.onChange(value);
    onChange(field.name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldNumberStateless
        {...rest}
        {...inputProps}
        onValueChange={handleChange}
      />
    </Wrapper>
  );
}
