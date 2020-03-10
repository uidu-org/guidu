import { DayPickerInputProps } from 'react-day-picker';

export type FieldDateProps = DayPickerInputProps & {
  locale?: string;
  displayFormat?: string;
  inputClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  innerRef?: React.RefObject<any>;
  formatSubmit?: string;
  selectMonths?: boolean;
};
