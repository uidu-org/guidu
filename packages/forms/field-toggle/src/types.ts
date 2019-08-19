import { FieldBaseProps } from '@uidu/field-base';

type BaseProps = FieldBaseProps & {
  /** Whether the toggle is disabled or not. This will prevent any interaction with the user */
  isDisabled: boolean;
  /** Defines the size of the toggle. */
  size: 'regular' | 'large';
};

// All base props have defaults
export type FieldToggleProps = BaseProps;

export type StatefulProps = BaseProps & {
  /** Whether the toggle is initially checked or not
   * After initial mount whether the component is checked or not is
   * controlled by the component */
  isDefaultChecked: boolean;
};

export type StatelessProps = BaseProps & {
  /** Whether the toggle is checked or not */
  isChecked: boolean;
};
