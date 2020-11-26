import { FieldBaseProps } from '@uidu/field-base';
import { RefObject } from 'react';
import { DayPickerInputProps, DayPickerProps } from 'react-day-picker';

export type FieldDateProps = FieldBaseProps &
  Omit<FieldDateStatelessProps, 'forwardedRef'>;

export type FieldDateCalendarStatelessProps = DayPickerInputProps & {
  forwardedRef?: RefObject<DayPickerProps>;
};

export type FieldDateStatelessProps = DayPickerInputProps & {
  id?: string;
  locale?: string;
  displayFormat?: string;
  inputClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  forwardedRef?: RefObject<any>;
  formatSubmit?: string;
  selectMonths?: boolean;
  withCalendar?: boolean;
};
