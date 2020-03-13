import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldRangeProps } from '../types';
import FieldRangeStateless from './FieldRangeStateless';

function FieldRange({
  name,
  onSetValue,
  onChange,
  forwardedRef,
  ...rest
}: FieldRangeProps) {
  const handleChange = value => {
    const formattedValue = parseFloat(value);
    onSetValue(formattedValue);
    onChange(name, formattedValue);
  };

  return (
    <Wrapper {...rest}>
      <FieldRangeStateless
        {...rest}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldRangeProps, ref: any) => (
  <FieldRange {...props} forwardedRef={ref} />
));
