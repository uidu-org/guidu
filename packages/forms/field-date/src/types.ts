import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';
import { DayPickerProps } from 'react-day-picker';

export type FieldDateStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  locale?: DayPickerProps['locale'];
  displayFormat?: string;
  formatSubmit?: string;
};

export type FieldDateProps = FieldBaseProps<string> &
  FieldDateStatelessProps &
  FieldDateCalendarProps & {
    withCalendar?: boolean;
  };

export type FieldDateCalendarProps = {
  locale?: DayPickerProps['locale'];
  value?: string;
  displayFormat?: string;
  formatSubmit?: string;
  dayPickerProps?: DayPickerProps;
  onDayChange?: DayPickerProps['onDayClick'];
  today?: Date;
};
