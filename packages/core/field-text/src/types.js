// @flow
import type { Node } from 'react';

export type FieldTextProps = {
  /** Standard HTML input autocomplete attribute. */
  autoComplete?: string,
  /** Standard HTML input form attribute. This is useful if the input cannot be included directly
   inside a form. */
  form?: string,
  /** Standard HTML input pattern attribute, used for validating using a regular expression. */
  pattern?: string,
  /** Set whether the fields should expand to fill available horizontal space. */
  compact?: boolean,
  /** Type value to be passed to the html input. */
  type?: string,
  /** Sets the field as uneditable, with a changed hover state. */
  disabled?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Add asterisk to label. Set required for form that the field is part of. */
  required?: boolean,
  /** Sets styling to indicate that the input is invalid. */
  isInvalid?: boolean,
  /** Label to be displayed above the input. */
  label?: string,
  /** Name value to be passed to the html input. */
  name?: string,
  /** Standard input min attribute, to be used with type="number" */
  min?: number,
  /** Standard input max attribute, to be used with type="number" */
  max?: number,
  /** Text to display in the input if the input is empty. */
  placeholder?: string,
  /** The value of the input. */
  value?: string | number,
  /** Handler to be called when the input loses focus. */
  onBlur?: (e: SyntheticEvent<>) => mixed,
  /** Handler to be called when the input changes. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler to be called when the input receives focus. */
  onFocus?: (e: SyntheticEvent<>) => mixed,
  /** Standard input onkeydown event. */
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => mixed,
  /** Standard input onkeypress event. */
  onKeyPress?: (e: SyntheticKeyboardEvent<>) => mixed,
  /** Standard input onkeyup event. */
  onKeyUp?: (e: SyntheticKeyboardEvent<>) => mixed,
  /** Id value to be passed to the html input. */
  id?: string,
  /** Sets whether to show or hide the label. */
  isLabelHidden?: boolean,
  /** Sets content text value to monospace */
  isMonospaced?: boolean,
  /** Provided component is rendered inside a modal dialogue when the field is
   selected. */
  invalidMessage?: Node,
  /** Ensure the input fits in to its containing element. */
  shouldFitContainer?: boolean,
  /** Sets whether to apply spell checking to the content. */
  isSpellCheckEnabled?: boolean,
  /** Sets whether the component should be automatically focused on component
   render. */
  autoFocus?: boolean,
  /** Set the maximum length that the entered text can be. */
  maxLength?: number,
  /** Hide the validation message and style. This is used by <Field> to disable Validation display handling by FieldBase
   */
  isValidationHidden?: boolean,
};
