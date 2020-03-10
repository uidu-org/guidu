import { FieldBaseProps } from '@uidu/field-base';
import { WithAnalyticsEventsProps } from '../../../core/analytics/src';

export type FieldCounterProps = Omit<FieldCounterStatelessProps, 'onChange'> &
  FieldBaseProps;

export type FieldCounterStatelessProps = WithAnalyticsEventsProps & {
  onChange?: (value: number) => void;
  className?: string;
  placeholder?: string | React.ReactNode;
  forwardedRef?: any;
  mobile?: 'auto' | boolean;
};
