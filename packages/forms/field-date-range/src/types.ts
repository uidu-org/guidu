import { FieldBaseProps } from '@uidu/field-base';
import { DateRange, DayPickerInputProps } from 'react-day-picker';

export type FieldDateRangeProps = FieldBaseProps<{
  from: string;
  to: string;
}> &
  FieldDateRangeStatelessProps;

export type FieldDateRangeStatelessProps = DayPickerInputProps & {
  formatSubmit?: string;
  onChange: (value: DateRange) => void;
  locale?: string;
  displayFormat?: string;
  placeholders?: {
    from: string;
    to: string;
  };
  from?: Date;
  to?: Date;
  className?: string;
};
