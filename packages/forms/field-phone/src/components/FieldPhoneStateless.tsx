import { FieldBaseStatelessProps } from '@uidu/field-base';
import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import Input from 'react-phone-number-input/input';
import { FieldPhoneStatelessProps } from '../types';

const FieldPhoneStateless = forwardRef<
  HTMLInputElement,
  FieldPhoneStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      className,
      value,
      placeholder,
      $hasError,
      country = 'IT',
      onBlur,
      onChange,
      required,
      disabled,
    },
    ref,
  ) => (
    <FieldTextStateless
      ref={ref}
      as={Input}
      placeholder={placeholder}
      $hasError={$hasError}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={className}
      options={{
        country,
        defaultCountry: country,
      }}
    />
  ),
);

export default FieldPhoneStateless;
