import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldTextStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  inputMode?: string;
  type?: string;
  autoComplete?: string;
};

export type FieldTextProps = FieldBaseProps<string> & FieldTextStatelessProps;
