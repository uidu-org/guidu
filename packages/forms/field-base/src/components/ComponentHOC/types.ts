import { FormsyInjectedProps } from 'formsy-react';
import { FieldBaseLayout, FieldBaseProps } from '../../types';

export type ComponentHOCProps = FormsyInjectedProps<any> & {
  layout: FieldBaseLayout;
  disabled?: boolean;
  validateOnSubmit?: boolean;
  validatePristine?: boolean;
  onChange?: () => void;
};

export type ComponentValue = string | string[];

export type RequiredFromOriginalComponentProps = FieldBaseProps;
