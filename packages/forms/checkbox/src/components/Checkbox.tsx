import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckboxProps } from '../types';
import InputControl from './CheckboxStateless';

function Checkbox({
  isIndeterminate = false,
  onSetValue,
  onChange,
  name,
  value,
  forwardedRef,
  ...rest
}: CheckboxProps & { forwardedRef: any }) {
  const { control } = useFormContext();

  const handleChange = (e) => {
    const value = e.currentTarget.checked;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl
        {...rest}
        name={name}
        isIndeterminate={isIndeterminate}
        checked={!!value}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: CheckboxProps, ref) => (
  <Checkbox {...props} forwardedRef={ref} />
));
