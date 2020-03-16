import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';
import NumericInput from 'react-numeric-input';

export type FieldCounterProps = Omit<FieldCounterStatelessProps, 'onChange'> &
  FieldBaseProps;

export type FieldCounterStatelessProps = {
  onChange?: (value: number) => void;
  className?: string;
  placeholder?: string | React.ReactNode;
  forwardedRef?: any;
  mobile?: 'auto' | boolean;
} & NumericInput &
  WithAnalyticsEventsProps;
