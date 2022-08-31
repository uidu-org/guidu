import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import tw from 'twin.macro';
import { CheckboxGroupProps } from '../types';
import CheckboxStateless from './CheckboxStateless';

function CheckboxGroup({
  isInline = false,
  className = null,
  options = [],
  value: defaultValue = [],
  onChange = noop,
  name,
  ...rest
}: CheckboxGroupProps) {
  const elements: Record<string, HTMLInputElement> = {};

  const { field, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = () => {
    const checkedOptions = options.filter(
      (option) => elements[option.id].checked,
    );
    const value = checkedOptions.map((option) => option.id);
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps} floatLabel={false}>
      <div
        css={[isInline ? tw`space-x-6` : tw`space-y-2`]}
        className={className}
      >
        {options.map((option) => (
          <CheckboxStateless
            key={`${name}-${option.id}`}
            ref={(c) => {
              if (c) {
                elements[option.id] = c;
              }
            }}
            id={option.id}
            value={option.id}
            label={option.name}
            isInline={isInline}
            name={name}
            checked={field.value.indexOf(option.id) >= 0}
            onChange={handleChange}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default CheckboxGroup;
