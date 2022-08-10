import { FieldBaseProps } from '@uidu/field-base';
import { HTMLAttributes } from 'react';

export type FieldTextStatelessProps = HTMLAttributes<HTMLInputElement> & {
  /** Standard HTML input autocomplete attribute. */
  autoComplete?: string;
  /** Sets whether to apply spell checking to the content. */
  isSpellCheckEnabled?: boolean;
  /** Sets whether the component should be automatically focused on component
   render. */
  autoFocus?: boolean;
  /** Set the maximum length that the entered text can be. */
  maxLength?: number;

  /** */
  validations?: string;

  /** Function that is called whenever the state of the checkbox changes. It will
   be called with an object containing the react synthetic event. Use currentTarget to get value, name and checked */
  onChange?: (name, value, otherProps?: any) => void;
  onSetValue?: (value, validate?: boolean) => void;

  forwardedRef?: any;
  // /** Handler to be called when the input loses focus. */
  componentRef?: React.RefObject<any>;
  onBlur?: (e: React.FocusEvent) => any;
  // /** Handler to be called when the input changes. */
  // onChange?: (e: React.ChangeEvent) => any;
  /** Handler to be called when the input receives focus. */
  onFocus?: (e: React.FocusEvent) => any;
  /** Standard input onkeydown event. */
  onKeyDown?: (e: React.KeyboardEvent) => any;
  /** Standard input onkeypress event. */
  onKeyPress?: (e: React.KeyboardEvent) => any;
  /** Standard input onkeyup event. */
  onKeyUp?: (e: React.KeyboardEvent) => any;
  /** Standard input onkeyup event. */
  ariaDescribedBy?: string;
  options?: any;
  as?: any;
  inputMode?: string;
  min?: number;
  max?: number;
  autoCorrect?: string;
  autoCapitalize?: string;
  mask?: string;
  pattern?: string;
  placeholder?: any;
  isReadOnly?: boolean;
  type?: string;
  value?: any;
  className?: string;
  disabled?: boolean;
};

export type FieldTextProps = FieldTextStatelessProps & FieldBaseProps;
