import { FieldBaseProps } from '@uidu/field-base';

export type FieldPasswordStatelessProps = {
  isPasswordVisible?: boolean;
} & FieldBaseProps;

export type FieldPasswordProps = {
  measurePasswordStrength?: boolean;
  passwordStrengths?: Array<string>;
  instructions?: React.ReactNode | string;
  tooltipProps?: {
    content: string;
  };
} & FieldPasswordStatelessProps;
