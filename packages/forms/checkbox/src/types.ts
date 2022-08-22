import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';

export type CheckboxGroupOptionsProps = {
  id: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = FieldBaseProps<string[]> & {
  isInline?: boolean;
  options: Array<CheckboxGroupOptionsProps>;
};

export type CheckboxProps = FieldBaseProps<boolean> &
  Omit<CheckboxStatelessProps, 'onChange'>;

export type CheckboxStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  /** Sets whether the checkbox is indeterminate. This only affects the
     style and does not modify the isChecked property. */
  isIndeterminate?: boolean;
  /** When rendered within CheckboxGroup. */
  isInline?: boolean;
};
