import { FieldBaseProps } from '@uidu/field-base';

export type FieldTextareaStatelessProps = {
  id?: string;
  className?: string;
  autoSize?: boolean;
  rows?: number;
  cols?: number;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  /** Sets the field as uneditable, with a changed hover state. */
  disabled?: boolean;
  /** Add asterisk to label. Set required for form that the field is part of. */
  required?: boolean;
  forwardedRef?: any;
};

export type FieldTextareaProps = {} & Omit<
  FieldTextareaStatelessProps,
  'onChange'
> &
  FieldBaseProps;
