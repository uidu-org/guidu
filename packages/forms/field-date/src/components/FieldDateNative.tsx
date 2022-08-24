import { useController, Wrapper } from '@uidu/field-base';
import { isValid, parse } from 'date-fns';
import React, { ChangeEvent } from 'react';
import { FieldDateProps } from '../types';
import FieldDateStateless from './FieldDateStateless';

export default function FieldDateNative({
  formatSubmit = 'yyyy-MM-dd',
  displayFormat = 'yyyy-MM-dd',
  onChange = () => {},
  name,
  value: defaultValue = '',
  ...rest
}: FieldDateProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const date = parse(value, formatSubmit, new Date());
    if (isValid(date)) {
      field.onChange(value);
      onChange(name, value);
    } else {
      field.onChange(null);
      onChange(name, null);
    }
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldDateStateless
        {...rest}
        {...inputProps}
        formatSubmit={formatSubmit}
        displayFormat={displayFormat}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
