import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import Input from 'react-phone-number-input/input';
import { FieldPhoneStatelessProps } from '../types';

function FieldPhone({
  id,
  className,
  value,
  forwardedRef,
  country = 'IT',
  onChange,
  ...rest
}: FieldPhoneStatelessProps) {
  return (
    <FieldTextStateless
      as={Input}
      options={{
        ref: forwardedRef,
        defaultCountry: country,
        value,
        onChange,
        className,
      }}
      {...rest}
    />
  );
}

const FieldPhoneStateless = forwardRef(
  (props: FieldPhoneStatelessProps, ref: any) => (
    <FieldPhone {...props} forwardedRef={ref} />
  ),
);

export default FieldPhoneStateless;
