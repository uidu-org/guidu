import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent, memo } from 'react';
import tw from 'twin.macro';
import { RadioGroupProps } from '../types';
import RadioStateless from './RadioStateless';

function RadioGroup({
  isInline = false,
  onChange,
  options,
  name,
  value: defaultValue,
  ...rest
}: RadioGroupProps) {
  const { field, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
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
    <Wrapper {...wrapperProps}>
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
            {...(option.id === field.value && { defaultChecked: true })}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default memo(RadioGroup);
