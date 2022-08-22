import { FieldBaseStatelessProps } from '@uidu/field-base';
import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import { FieldPasswordStatelessProps } from '../types';

const FieldPasswordStateless = forwardRef<
  HTMLInputElement,
  FieldPasswordStatelessProps & FieldBaseStatelessProps
>(({ isPasswordVisible = false, ...rest }, ref) => {
  if (isPasswordVisible) {
    return <FieldTextStateless {...rest} type="text" ref={ref} />;
  }
  return <FieldTextStateless {...rest} type="password" ref={ref} />;
});

export default FieldPasswordStateless;
