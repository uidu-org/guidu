import { FieldBaseProps } from '@uidu/field-base';

export type FieldColorPickerProps<T> = FieldBaseProps<T> & {
  colors?: String[];
  trigger: React.FC<{ toggleDialog; value; forwardedRef }>;
  showInput?: boolean;
};
