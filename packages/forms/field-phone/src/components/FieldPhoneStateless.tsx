import { FieldBaseStatelessProps } from '@uidu/field-base';
import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import Input from 'react-phone-number-input/input';
import { FieldPhoneStatelessProps } from '../types';

const FieldPhoneStateless = forwardRef<
  HTMLInputElement,
  FieldPhoneStatelessProps & FieldBaseStatelessProps
>(({ className, value, country = 'IT', onChange, ...rest }, ref) => (
  <FieldTextStateless
    as={Input}
    options={{
      ref,
      country,
      defaultCountry: country,
      value,
      onChange,
      className,
    }}
    {...rest}
  />
));

export default FieldPhoneStateless;
