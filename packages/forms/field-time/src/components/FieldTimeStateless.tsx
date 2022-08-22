import { StyledInput } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTimeStatelessProps } from '../types';

const FieldTimeStateless = forwardRef<
  HTMLInputElement,
  FieldTimeStatelessProps
>(
  (
    {
      name,
      className,
      forwardedRef,
      onChange,
      value = '',
      required,
      disabled,
      interval,
      start,
      end,
      ...rest
    },
    ref,
  ) => (
    <StyledInput
      className={className}
      value={value}
      disabled={disabled}
      ref={ref}
      type="time"
      name={name}
      onChange={onChange}
      required={required}
      {...rest}
    />
  ),
);

export default FieldTimeStateless;
