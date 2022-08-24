import { FieldBaseProps } from '@uidu/field-base';
import { DayPickerInputProps } from 'react-day-picker';

export type FieldDateRangeProps = FieldBaseProps & FieldDateRangeStatelessProps;

export type FieldDateRangeStatelessProps = DayPickerInputProps & {
  formatSubmit?: string;
  onChange: (value: any) => void;
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
