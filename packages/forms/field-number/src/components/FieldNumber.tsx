import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { NumberFormatValues } from 'react-number-format';
import { FieldNumberProps } from '../types';
import InputControl from './FieldNumberStateless';

export default function FieldNumber({
  name,
  value: defaultValue,
  ...rest
}: FieldNumberProps) {
  const { field, wrapperProps, inputProps, onChange } = useController({
    name,
    defaultValue,
    ...rest,
  });

  const handleChange = (values: NumberFormatValues) => {
    const { value } = values;
    field.onChange(value);
    onChange(field.name, value);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper {...wrapperProps}>
      <InputControl
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
        onValueChange={handleChange}
      />
    </Wrapper>
  );
}
