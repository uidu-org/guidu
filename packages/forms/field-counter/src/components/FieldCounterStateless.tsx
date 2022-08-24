import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldCounterStatelessProps } from '../types';

const FieldCounterStateless = forwardRef<
  HTMLInputElement,
  FieldCounterStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      fieldState,
      disabled,
      required,
      onChange,
      value,
      min,
      max,
      step,
      ...rest
    },
    ref,
  ) => (
    <StyledInput
      ref={ref}
      type="number"
      inputMode="numeric"
      autoComplete="off"
      tw="block"
      $hasError={!!fieldState?.error}
      disabled={disabled}
      required={required}
      onChange={onChange}
      value={value}
      min={min}
      max={max}
      step={step}
      {...rest}
    />
  ),
);

export default FieldCounterStateless;
