import { Wrapper } from '@uidu/field-base';
import React from 'react';
import tw from 'twin.macro';
import { CheckboxGroupProps } from '../types';
import CheckboxStateless from './CheckboxStateless';

function CheckboxGroup({
  isInline = false,
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
      (option) => elements[option.id].checked,
    );
    const value = checkedOptions.map((option) => option.id);
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <div css={[isInline ? tw`space-x-6` : tw`space-y-2`]}>
        {options.map((option) => (
          <CheckboxStateless
            key={`${name}-${option.id}`}
            id={`${name}-${option.id}`}
            ref={(c: any) => {
              if (c) {
                elements[option.id] = c;
              }
            }}
            isInline={isInline}
            label={option.name}
            name={name}
            checked={value.indexOf(option.id) >= 0}
            onChange={handleChange}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default CheckboxGroup;
