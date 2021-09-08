import { FieldBaseProps } from '@uidu/field-base';

export type FieldColorPickerProps = FieldBaseProps & {
  colors?: String[];
  trigger: React.FC<{ toggleDialog; value; forwardedRef }>;
};
