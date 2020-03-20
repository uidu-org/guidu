import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';
import { NumberFormatProps } from 'react-number-format';

export type FieldNumberStatelessProps = {
  /** React-numeric-input options */
  value?: number | string;
  /** React-numeric-input options */
  options?: NumberFormatProps;
  /** React-numeric-input options */
  onValueChange?: (values) => void;
  forwardedRef?: any;
} & WithAnalyticsEventsProps;

export type FieldNumberType = 'text' | 'tel';

export type FieldNumberProps = {
  /** Type value to be passed to the html input. */
  type?: string | FieldNumberType;
  /** Standard input min attribute, to be used with type="number" */
  min?: number;
  /** Standard input max attribute, to be used with type="number" */
  max?: number;
} & FieldNumberStatelessProps &
  FieldBaseProps;
