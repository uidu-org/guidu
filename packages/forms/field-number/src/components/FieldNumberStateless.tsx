import { FieldTextStateless } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import { FieldNumberStatelessProps } from '../types';

function FieldNumber({
  options,
  onValueChange,
  forwardedRef,
  value,
  ...rest
}: FieldNumberStatelessProps) {
  return (
    <FieldTextStateless
      inputMode="numeric"
      as={NumberFormat}
      options={{
        thousandSeparator: '.',
        decimalSeparator: ',',
        isNumericString: true,
        decimalScale: 2,
        onValueChange,
        getInputRef: forwardedRef,
        value, // check https://github.com/s-yadav/react-number-format/issues/283
        ...options,
      }}
      {...rest}
    />
  );
}

const FieldNumberStateless = forwardRef(
  (props: FieldNumberStatelessProps, ref) => (
    <FieldNumber {...props} forwardedRef={ref} />
  ),
);

export default FieldNumberStateless;
