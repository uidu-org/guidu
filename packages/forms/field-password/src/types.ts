import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldPasswordStatelessProps = {
  isPasswordVisible?: boolean;
} & WithAnalyticsEventsProps &
  FieldBaseProps;

export type FieldPasswordProps = {
  measurePasswordStrength?: boolean;
  passwordStrengths?: Array<string>;
  instructions?: React.ReactNode | string;
  tooltipProps?: {
    content: string;
  };
} & FieldPasswordStatelessProps;
