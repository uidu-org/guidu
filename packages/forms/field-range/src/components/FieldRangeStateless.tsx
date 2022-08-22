import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { ChangeEvent, forwardRef, useMemo } from 'react';
import { Input } from '../styled';
import { FieldRangeStatelessProps } from '../types';

const getPercentValue = (value: number, min: number, max: number): string => {
  let percent = '0';
  if (min < max && value > min) {
    percent = (((value - min) / (max - min)) * 100).toFixed(2);
  }
  return percent;
};

const FieldRangeStateless = forwardRef<
  HTMLInputElement,
  FieldRangeStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      id,
      value,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      ...rest
    }: FieldRangeStatelessProps,
    ref,
  ) => {
    const valuePercent = useMemo(
      () => getPercentValue(value, min, max),
      [value, min, max],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <Input
        id={id}
        ref={ref}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        disabled={disabled}
        valuePercent={valuePercent}
        {...rest}
      />
    );
  },
);

export default FieldRangeStateless;
