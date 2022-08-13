/* eslint-disable react/jsx-props-no-spreading */
import { Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
import {
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';
import { FieldTextStatelessProps } from '../types';
import FieldTextStateless from './FieldTextStateless';

type FieldTextProps<T> = FieldTextStatelessProps & {
  name: Path<T>;
  options: RegisterOptions;
  onChange: (name: string, value: T) => void;
};

export default function FieldText<T>(props: FieldTextProps<T>) {
  const {
    name,
    onChange: handleChange = () => {},
    value: defaultValue,
  } = props;

  const { control } = useFormContext<T>();
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController<T>({
    name,
    control,
    defaultValue: defaultValue || '',
  });

  return (
    <Wrapper {...props}>
      <FieldTextStateless
        {...props}
        ref={ref}
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value);
          handleChange(name, e.currentTarget.value);
        }}
        onBlur={onBlur}
      />
    </Wrapper>
  );
}
