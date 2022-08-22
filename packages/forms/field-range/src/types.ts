import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldRangeStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  valuePercent?: number;
};

export type FieldRangeProps = {} & FieldBaseProps<string | number> &
  FieldRangeStatelessProps;
