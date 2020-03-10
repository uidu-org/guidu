import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTextProps } from '../types';
import InputControl from './FieldTextStateless';

function FieldText({
  component: StatelessInput = InputControl,
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldTextProps & { forwardedRef: any }) {
  const handleChange = event => {
    const { value } = event.currentTarget;
    onChange(name, value);
    onSetValue(value);
  };

  return (
    <Wrapper {...rest}>
      <StatelessInput {...rest} onChange={handleChange} ref={forwardedRef} />
    </Wrapper>
  );
}

export default forwardRef((props: FieldTextProps, ref) => (
  <FieldText {...props} forwardedRef={ref} />
));
