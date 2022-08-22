/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { CheckboxProps } from '../types';
import CheckboxStateless from './CheckboxStateless';

export default function Checkbox({
  isIndeterminate = false,
  onChange = () => {},
  name,
  value: defaultValue,
  ...rest
}: CheckboxProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps} label={null} floatLabel={false}>
      <CheckboxStateless
        {...rest}
        {...inputProps}
        isIndeterminate={isIndeterminate}
        value={name}
        checked={!!field.value}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
