import { DayPickerInputProps } from 'react-day-picker';

export type FieldDateProps = DayPickerInputProps & {
  locale: string;
  displayFormat?: string;
};
