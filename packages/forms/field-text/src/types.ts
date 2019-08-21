import { FieldBaseProps } from '@uidu/field-base';

export type FieldTextProps = FieldBaseProps & {
  options?: any;
  component?: any;
  inputMode?: string;
  min?: number;
  max?: number;
};
