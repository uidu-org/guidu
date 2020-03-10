import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldCounterProps } from '../types';
import InputControl from './FieldCounterStateless';

function FieldCounter({
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldCounterProps & { forwardedRef: any }) {
  const handleChange = value => {
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl {...rest} onChange={handleChange} ref={forwardedRef} />
    </Wrapper>
  );
}

export default forwardRef((props: FieldCounterProps, ref) => (
  <FieldCounter {...props} forwardedRef={ref} />
));
