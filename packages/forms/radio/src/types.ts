import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type RadioOption = {
  id: string;
  name: string;
};

export type RadioProps = FieldBaseProps<string> & RadioStatelessProps;

export type RadioGroupProps = {
  isInline?: boolean;
  options: Array<RadioOption>;
} & FieldBaseProps<string>;

export type RadioStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  isInline?: boolean;
};
