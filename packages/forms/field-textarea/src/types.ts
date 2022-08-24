import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldTextareaStatelessProps =
  AllHTMLAttributes<HTMLTextAreaElement> & {
    autoSize?: boolean;
    rows?: number;
    cols?: number;
  };

export type FieldTextareaProps = FieldBaseProps<string> &
  Omit<FieldTextareaStatelessProps, 'onChange'>;
