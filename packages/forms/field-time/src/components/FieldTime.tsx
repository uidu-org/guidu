import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldTimeProps } from '../types';
import FieldTimeStateless from './FieldTimeStateless';

function FieldTime({
  onChange,
  onSetValue,
  name,
  forwardedRef,
  ...rest
}: FieldTimeProps) {
  const handleChange = (e) => {
    onSetValue(e.target.value);
    onChange(name, e.target.value);
  };

  return (
    <Wrapper {...rest}>
      <FieldTimeStateless
        {...rest}
        name={name}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldTimeProps, ref) => (
  <FieldTime {...props} forwardedRef={ref} />
));
