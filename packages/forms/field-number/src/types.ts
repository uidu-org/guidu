import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldNumberType = 'text' | 'tel';

export type FieldNumberProps = FieldBaseProps &
  WithAnalyticsEventsProps & {
    /** Type value to be passed to the html input. */
    type?: FieldNumberType;
    /** Standard input min attribute, to be used with type="number" */
    min?: number;
    /** Standard input max attribute, to be used with type="number" */
    max?: number;
    /** React-numeric-input options */
    options?: any;
    onValueChange: (values) => void;
  };
