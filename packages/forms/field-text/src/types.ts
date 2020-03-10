import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldTextProps = FieldBaseProps &
  WithAnalyticsEventsProps & {
    options?: any;
    component?: any;
    inputMode?: string;
    min?: number;
    max?: number;
    autoCorrect?: string;
    autoCapitalize?: string;
    mask?: string;
  };
