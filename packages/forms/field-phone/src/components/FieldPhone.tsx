import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldPhoneProps } from '../types';
import InputControl from './FieldPhoneStateless';

function FieldPhone({
  onSetValue,
  onChange,
  forwardedRef,
  ...rest
}: FieldPhoneProps & { forwardedRef: any }) {
  const handleChange = (value: string) => {
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl {...rest} onChange={handleChange} ref={forwardedRef} />
    </Wrapper>
  );
}

export default forwardRef((props: FieldPhoneProps, ref) => (
  <FieldPhone {...props} forwardedRef={ref} />
));
