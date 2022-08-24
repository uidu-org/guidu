import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldCounterProps = Omit<FieldCounterStatelessProps, 'onChange'> &
  FieldBaseProps<number>;

export type FieldCounterStatelessProps = AllHTMLAttributes<HTMLInputElement>;
