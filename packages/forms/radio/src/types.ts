import { FieldBaseProps } from '@uidu/field-base';

export type RadioOption = {
  id: string;
  name: string;
};

export type RadioProps = {} & FieldBaseProps;
export type RadioGroupProps = {
  isInline?: boolean;
  options: Array<RadioOption>;
} & FieldBaseProps;

export type RadioStatelessProps = {
  isInline?: boolean;
  value?: any;
  label?: string | React.ReactNode;
  id?: string;
  name?: string;
  onChange?: (event: any) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
};
