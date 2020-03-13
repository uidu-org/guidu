import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTextProps } from '../types';
import FieldTextStateless from './FieldTextStateless';

function FieldText({
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldTextProps) {
  const handleChange = event => {
    const { value } = event.currentTarget;
    onChange(name, value);
    onSetValue(value, false);
  };

  const onBlur = event => {
    const { value } = event.currentTarget;
    onSetValue(value);
  };

  return (
    <Wrapper {...rest}>
      <FieldTextStateless
        {...rest}
        onChange={handleChange}
        onBlur={onBlur}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldTextProps, ref) => (
  <FieldText {...props} forwardedRef={ref} />
));
