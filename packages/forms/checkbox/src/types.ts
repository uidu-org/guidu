import { FieldBaseProps } from '@uidu/field-base';

export type CheckboxGroupOptionsProps = {
  id: string;
  name: string | React.ReactNode;
  label?: string | React.ReactNode;
  disabled?: boolean;
};

export type CheckboxGroupProps = FieldBaseProps & {
  options: Array<CheckboxGroupOptionsProps>;
};

export type CheckboxProps = FieldBaseProps & {
  /** Sets whether the checkbox begins checked. */
  defaultChecked: boolean;
  /** id assigned to input */
  id: string;
  /** Sets whether the checkbox is checked or unchecked. */
  isChecked?: boolean;
  /** Sets whether the checkbox is disabled. */
  isDisabled?: boolean;
  /** Sets whether the checkbox is indeterminate. This only affects the
   style and does not modify the isChecked property. */
  isIndeterminate?: boolean;
  /** Marks the field as invalid. Changes style of unchecked component. */
  isInvalid?: boolean;
  /** Marks the field as required & changes the label style. */
  isRequired?: boolean;
  /** The label to be displayed to the right of the checkbox. The label is part
   label?: React.ReactNode | string;
   of the clickable element to select the checkbox. */
  /** The name of the submitted field in a checkbox. */
  name?: string;
  /** The value to be used in the checkbox input. This is the value that will be returned on form submission. */
  value?: number | string;
};
