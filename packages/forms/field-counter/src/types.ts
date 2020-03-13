import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldCounterProps = Omit<FieldCounterStatelessProps, 'onChange'> &
  FieldBaseProps;

export type FieldCounterStatelessProps = WithAnalyticsEventsProps & {
  onChange?: (value: number) => void;
  className?: string;
  placeholder?: string | React.ReactNode;
  forwardedRef?: any;
  mobile?: 'auto' | boolean;
};
