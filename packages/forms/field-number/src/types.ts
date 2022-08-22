import { FieldBaseProps } from '@uidu/field-base';
import { NumberFormatProps, NumberFormatValues } from 'react-number-format';

export type FieldNumberStatelessProps = {
  /** React-numeric-input options */
  value?: number;
  /** React-numeric-input options */
  options?: NumberFormatProps;
  /** React-numeric-input options */
  onValueChange?: (values: NumberFormatValues) => void;
};

export type FieldNumberType = 'text' | 'tel';

export type FieldNumberProps = {
  /** Type value to be passed to the html input. */
  type?: string | FieldNumberType;
  /** Standard input min attribute, to be used with type="number" */
  min?: number;
  /** Standard input max attribute, to be used with type="number" */
  max?: number;
} & FieldNumberStatelessProps &
  FieldBaseProps<string | number>;
