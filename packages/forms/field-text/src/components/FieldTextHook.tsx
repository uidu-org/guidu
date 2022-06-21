/* eslint-disable react/jsx-props-no-spreading */
import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import StyledInput from '../styled/Input';

export default function FieldTextHook<T>({
  register,
  name,
  ...props
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
}) {
  return (
    <Wrapper {...props}>
      <StyledInput
        tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
        {...register(name)}
        {...props} // for other input patterns}
      />
    </Wrapper>
  );
}
