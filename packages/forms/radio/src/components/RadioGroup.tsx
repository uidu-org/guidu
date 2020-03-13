import { Wrapper } from '@uidu/field-base';
import React, { memo } from 'react';
import { RadioGroupProps } from '../types';
import RadioStateless from './RadioStateless';

function RadioGroup({
  isInline = false,
  onChange,
  onSetValue,
  options,
  name,
  value,
  ...rest
}: RadioGroupProps) {
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      {options.map(option => (
        <RadioStateless
          isInline={isInline}
          key={`${name}-${option.id}`}
          id={`${name}-${option.id}`}
          value={option.id}
          label={option.name}
          name={name}
          onChange={handleChange}
          {...(option.id === value && { defaultChecked: true })}
        />
      ))}
    </Wrapper>
  );
}

export default memo(RadioGroup);
