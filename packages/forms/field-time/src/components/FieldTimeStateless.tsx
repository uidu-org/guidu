import { StyledInput } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTimeStatelessProps } from '../types';

const FieldTimeStateless = forwardRef<
  HTMLInputElement,
  FieldTimeStatelessProps
>(
  (
    { name, className, onChange, value = '', required, disabled, ...rest },
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
