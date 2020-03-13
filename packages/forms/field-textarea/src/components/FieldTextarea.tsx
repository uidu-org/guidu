import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTextareaProps } from '../types';
import InputControl from './FieldTextareaStateless';

function FieldTextarea({
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldTextareaProps) {
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl
        {...rest}
        onChange={handleChange}
        ref={forwardedRef}
        // ref={this.element}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldTextareaProps, ref) => (
  <FieldTextarea {...props} forwardedRef={ref} />
));
