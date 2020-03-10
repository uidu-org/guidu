import { Wrapper } from '@uidu/field-base';
import moment from 'moment';
import React, { forwardRef } from 'react';
import { FieldDateProps } from '../types';
import InputControl from './FieldDateStateless';

function FieldDate({
  formatSubmit = 'YYYY-MM-DD',
  onSetValue,
  onChange,
  forwardedRef,
  ...rest
}: FieldDateProps & { forwardedRef: any }) {
  const handleChange = (date: any) => {
    const value = date ? moment(date).format(formatSubmit) : '';
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl {...rest} onDayChange={handleChange} ref={forwardedRef} />
    </Wrapper>
  );
}

export default forwardRef((props: FieldDateProps, ref) => (
  <FieldDate {...props} forwardedRef={ref} />
));
