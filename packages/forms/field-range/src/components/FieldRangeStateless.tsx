import React, { forwardRef, useMemo } from 'react';
import { Input } from '../styled';
import { FieldRangeStatelessProps } from '../types';

const getPercentValue = (value: number, min: number, max: number): string => {
  let percent = '0';
  if (min < max && value > min) {
    percent = (((value - min) / (max - min)) * 100).toFixed(2);
  }
  return percent;
};

function FieldRangeStateless({
  id,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  forwardedRef,
}: FieldRangeStatelessProps) {
  const valuePercent = useMemo(() => getPercentValue(value, min, max), [
    value,
    min,
    max,
  ]);

  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <Input
      id={id}
      ref={forwardedRef}
      type="range"
      defaultValue={value?.toString()}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      disabled={disabled}
      valuePercent={valuePercent}
    />
  );
}

export default forwardRef((props: FieldRangeStatelessProps, ref: any) => (
  <FieldRangeStateless {...props} forwardedRef={ref} />
));
