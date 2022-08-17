/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import { Path, RegisterOptions } from 'react-hook-form';
import { FieldTextStatelessProps } from '../types';
import FieldTextStateless from './FieldTextStateless';

type FieldTextProps<T> = FieldTextStatelessProps & {
  name: Path<T>;
  options: RegisterOptions;
  onChange: (name: string, value: T) => void;
};

export default function FieldText<T>({
  name,
  onChange = () => {},
  value: defaultValue,
  ...rest
}: FieldTextProps<T>) {
  const { field, inputProps, wrapperProps } = useController<T>({
    name,
    defaultValue: defaultValue || '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.currentTarget.value);
    onChange(name, e.currentTarget.value);
  };

  return (
    <Wrapper {...rest} {...wrapperProps}>
      <FieldTextStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
