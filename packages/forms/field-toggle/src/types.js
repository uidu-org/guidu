// @flow

type BaseProps = {
  /** Whether the toggle is disabled or not. This will prevent any interaction with the user */
  isDisabled: boolean,
  /** Label to be set for accessibility */
  label: string,
  /** Descriptive name for value property to be submitted in a form */
  name: string,
  /** The value to be submitted in a form. */
  value: string,
  /** Handler to be called when toggle is unfocused */
  onBlur: (event: Event) => void,
  /** Handler to be called when native 'change' event happens internally. */
  onChange: (event: Event) => void,
  /** Handler to be called when toggle is focused. */
  onFocus: (event: Event) => void,
  /** Defines the size of the toggle. */
  size: 'regular' | 'large',
};

// All base props have defaults
export type DefaultBaseProps = BaseProps;

export type StatefulProps = BaseProps & {
  /** Whether the toggle is initially checked or not
   * After initial mount whether the component is checked or not is
   * controlled by the component */
  isDefaultChecked: boolean,
};

export type StatelessProps = BaseProps & {
  /** Whether the toggle is checked or not */
  isChecked: boolean,
};
