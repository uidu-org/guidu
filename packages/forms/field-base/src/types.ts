import { WrapperProps } from './components/Wrapper/types';

export type FieldBaseLayout = 'horizontal' | 'vertical' | 'elementOnly';

export type FieldBaseProps = WrapperProps & {
  validateBeforeSubmit?: boolean;
  validatePristine?: boolean;
  // layout?: FieldBaseLayout;
  // value?: ComponentValue;
  // disabled?: boolean;
  // id?: string;
  // label?: React.ReactNode;
  // errorMessages: Array<string>;
  // errorMessage: any;
  // help?: React.ReactNode | string;
  /** Standard HTML input pattern attribute, used for validating using a regular expression. */
  pattern?: string;
  /** Sets the field as uneditable, with a changed hover state. */
  disabled?: boolean;
  /** Add asterisk to label. Set required for form that the field is part of. */
  // required?: boolean;
  /** Is Pristine */
  isPristine?: boolean;
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean;

  // showErrors?: boolean;
  /** type assigned to input */
  // type?: string;
  /** id assigned to input */
  // id?: string;
  /** The name of the submitted field. */
  value?: any;
  /** The name of the submitted field. */
  name: string;
  /** Text to display in the input if the input is empty. */
  placeholder?: string | React.ReactNode;

  className?: string;

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
  onBlur?: (name, value) => void;
  onSetValue?: (value) => void;

  forwardedRef?: any;
  // /** Handler to be called when the input loses focus. */
  componentRef?: React.RefObject<any>;
  // onBlur?: (e: React.FocusEvent) => any;
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
};
