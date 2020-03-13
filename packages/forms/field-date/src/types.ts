import { FieldBaseProps } from '@uidu/field-base';
import { DayPickerInputProps } from 'react-day-picker';

export type FieldDateProps = FieldBaseProps &
  Omit<FieldDateStatelessProps, 'forwardedRef'>;

export type FieldDateStatelessProps = DayPickerInputProps & {
  id?: string;
  locale?: string;
  displayFormat?: string;
  inputClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  forwardedRef?: React.RefObject<any>;
  formatSubmit?: string;
  selectMonths?: boolean;
};
