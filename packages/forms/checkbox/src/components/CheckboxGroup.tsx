import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { CheckboxGroupProps } from '../types';
import CheckboxStateless from './CheckboxStateless';

function CheckboxGroup({
  type = 'stacked',
  options = [],
  value = [],
  onSetValue,
  onChange,
  name,
  ...rest
}: CheckboxGroupProps) {
  const elements = {};

  const handleChange = () => {
    const checkedOptions = options.filter(
      option => elements[option.id].checked,
    );
    const value = checkedOptions.map(option => option.id);
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      {options.map(option => (
        <CheckboxStateless
          ref={(c: any) => {
            if (c) {
              elements[option.id] = c;
            }
          }}
          key={option.id}
          id={option.id}
          label={option.name}
          name={name}
          checked={value.indexOf(option.id) >= 0}
          onChange={handleChange}
        />
      ))}
    </Wrapper>
  );
}

export default CheckboxGroup;
