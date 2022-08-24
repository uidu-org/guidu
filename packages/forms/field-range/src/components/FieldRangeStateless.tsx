import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { forwardRef, useMemo } from 'react';
import { StyledRange, StyledSlider, StyledThumb, StyledTrack } from '../styled';
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
      fieldState,
      ...rest
    },
    ref,
  ) => {
    const valuePercent = useMemo(
      () => getPercentValue(value, min, max),
      [value, min, max],
    );

    return (
      <StyledSlider
        name={rest.name}
        defaultValue={[value]}
        aria-label={rest.name}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <StyledTrack $hasError={!!fieldState?.error}>
          <StyledRange />
        </StyledTrack>
        <StyledThumb ref={ref} id={id} onBlur={rest.onBlur} />
      </StyledSlider>
    );
  },
);

export default FieldRangeStateless;
