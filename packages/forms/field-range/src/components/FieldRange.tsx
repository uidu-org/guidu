/* eslint-disable react/jsx-props-no-spreading */
import { SliderProps } from '@radix-ui/react-slider';
import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldRangeProps } from '../types';
import FieldRangeStateless from './FieldRangeStateless';

export default function FieldRange({
  name,
  value: defaultValue = '',
  onChange = noop,
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

  const handleChange: SliderProps['onValueChange'] = (value) => {
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps} errorIcon={() => null}>
      <FieldRangeStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
