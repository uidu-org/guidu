import { PassDownProps } from 'formsy-react/dist/Wrapper';
import { FieldBaseLayout, FieldBaseProps } from '../../types';

export type ComponentHOCProps = PassDownProps<any> & {
  layout: FieldBaseLayout;
  disabled?: boolean;
  validateOnSubmit?: boolean;
  validatePristine?: boolean;
  onChange?: () => void;
};

export type ComponentValue = string | string[];

export type RequiredFromOriginalComponentProps = FieldBaseProps;
