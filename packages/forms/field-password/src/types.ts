import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldPasswordProps = FieldBaseProps &
  WithAnalyticsEventsProps & {
    measurePasswordStrength?: boolean;
    passwordStrengths?: Array<string>;
    instructions?: React.ReactNode | string;
    tooltipProps?: {
      content: string;
    };
  };
