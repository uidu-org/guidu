import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import { isValid, parse } from 'date-fns';
import format from 'date-fns/format';
import React, { forwardRef } from 'react';

import { FieldDateStatelessProps } from '../types';

const FieldDateStateless = forwardRef<
  HTMLInputElement,
  FieldDateStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      id,
      value = '',
      name,
      className,
      onChange,
      onFocus,
      onBlur,
      disabled,
      required,
      min,
      max,
      fieldState,
      displayFormat = 'yyyy-MM-dd',
      formatSubmit,
      locale,
    },
    ref,
  ) => {
    const date = value
      ? parse(value, formatSubmit, new Date(), { locale })
      : null;

    return (
      <StyledInput
        hasError={!!fieldState?.error}
        id={id}
        value={isValid(date) ? format(date, displayFormat) : ''}
        ref={ref}
        type="date"
        name={name}
        className={className}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
      />
    );
  },
);

export default FieldDateStateless;
