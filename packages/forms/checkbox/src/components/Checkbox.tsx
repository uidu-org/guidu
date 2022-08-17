import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { CheckboxProps } from '../types';
import InputControl from './CheckboxStateless';

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
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest} {...wrapperProps}>
      <InputControl
        {...rest}
        {...inputProps}
        isIndeterminate={isIndeterminate}
        checked={!!field.value}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
