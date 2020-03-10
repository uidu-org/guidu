import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldDateRangeProps } from '../types';
import InputControl from './FieldDateRangeStateless';

function FieldDateRange({
  formatSubmit = 'YYYY-MM-DD',
  onSetValue,
  onChange,
  ...rest
}: FieldDateRangeProps) {
  const handleChange = (value: any) => {
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl
        {...rest}
        onChange={handleChange}
        // ref={this.element}
      />
    </Wrapper>
  );
}

export default FieldDateRange;
