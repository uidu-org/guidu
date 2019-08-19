import { FieldBaseProps } from '@uidu/field-base';

export type FieldPasswordProps = FieldBaseProps & {
  measurePasswordStrength: boolean;
  passwordStrengths: Array<string>;
  instructions: React.ReactNode | string;
  tooltipProps: {
    content?: string;
  };
};
