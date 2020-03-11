import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { NumberFormatValues } from 'react-number-format';
import { FieldNumberProps } from '../types';
import InputControl from './FieldNumberStateless';

function FieldNumber({
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldNumberProps) {
  const handleChange = (values: NumberFormatValues) => {
    const { value } = values;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl {...rest} onValueChange={handleChange} ref={forwardedRef} />
    </Wrapper>
  );
}

export default forwardRef((props: FieldNumberProps, ref) => (
  <FieldNumber {...props} forwardedRef={ref} />
));
