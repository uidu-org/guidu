import { SliderProps } from '@radix-ui/react-slider';
import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldRangeStatelessProps = AllHTMLAttributes<HTMLInputElement> &
  SliderProps & {
    valuePercent?: number;
  };

export type FieldRangeProps = FieldBaseProps<number[]> &
  FieldRangeStatelessProps;
