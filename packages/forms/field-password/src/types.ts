import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type FieldPasswordStatelessProps =
  AllHTMLAttributes<HTMLInputElement> & {
    isPasswordVisible?: boolean;
  };

export type FieldPasswordProps = {
  measurePasswordStrength?: boolean;
  passwordStrengths?: Array<string>;
  instructions?: React.ReactNode | string;
  tooltipProps?: {
    content: string;
  };
} & FieldBaseProps<string>;
