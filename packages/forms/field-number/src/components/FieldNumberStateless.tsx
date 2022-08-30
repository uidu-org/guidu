import { FieldBaseStatelessProps } from '@uidu/field-base';
import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import { FieldNumberStatelessProps } from '../types';

const FieldNumberStateless = forwardRef<
  HTMLInputElement,
  FieldNumberStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      options,
      onValueChange,
      value,
      fieldState,
      placeholder,
      required,
      disabled,
      onBlur,
      name,
      className,
      ...rest
    },
    ref,
  ) => (
    <FieldTextStateless
      inputMode="numeric"
      fieldState={fieldState}
      as={NumberFormat}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      className={className}
      options={{
        thousandSeparator: '.',
        decimalSeparator: ',',
        // isNumericString: true,
        decimalScale: 2,
        onValueChange,
        getInputRef: ref,
        value,
        ...options,
      }}
    />
  ),
);

export default FieldNumberStateless;
