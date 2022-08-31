/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import tw from 'twin.macro';
import { RadioGroupProps } from '../types';
import RadioStateless from './RadioStateless';

function RadioGroup({
  isInline = false,
  onChange = noop,
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
    <Wrapper {...wrapperProps} floatLabel={false}>
      <div css={[isInline ? tw`space-x-6` : tw`space-y-2`]}>
        {options.map((option) => (
          <RadioStateless
            {...rest}
            {...field}
            key={`${name}-${option.id}`}
            id={`${name}-${option.id}`}
            value={option.id}
            label={option.name}
            name={name}
            isInline={isInline}
            onChange={handleChange}
            {...(option.id === field.value && { checked: true })}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default RadioGroup;
