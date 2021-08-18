import { Wrapper } from '@uidu/field-base';
import React, { memo } from 'react';
import tw from 'twin.macro';
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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <div css={[isInline ? tw`space-x-6` : tw`space-y-2`]}>
        {options.map((option) => (
          <RadioStateless
            key={`${name}-${option.id}`}
            id={`${name}-${option.id}`}
            value={option.id}
            label={option.name}
            name={name}
            onChange={handleChange}
            isInline={isInline}
            {...(option.id === value && { defaultChecked: true })}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default memo(RadioGroup);
