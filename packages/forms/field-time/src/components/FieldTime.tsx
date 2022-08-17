import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { FieldTimeProps } from '../types';
import FieldTimeStateless from './FieldTimeStateless';

export default function FieldTime({
  onChange = () => {},
  name,
  value: defaultValue,
  ...rest
}: FieldTimeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    onChange(name, e.target.value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldTimeStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
