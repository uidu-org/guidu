import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import { format, isValid, parse } from 'date-fns';
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
      ...rest
    },
    ref,
  ) => {
    const date = value
      ? parse(value, formatSubmit, new Date(), { locale })
      : null;

    return (
      <StyledInput
        {...rest}
        $hasError={!!fieldState?.error}
        id={id}
        defaultValue={isValid(date) ? format(date, displayFormat) : ''}
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
