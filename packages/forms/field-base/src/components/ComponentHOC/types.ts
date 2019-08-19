import { PassDownProps } from 'formsy-react/dist/Wrapper';
import { FieldBaseLayout } from '../../types';

export type ComponentHOCProps = PassDownProps & {
  layout: FieldBaseLayout;
  disabled?: boolean;
  validateOnSubmit?: boolean;
  validatePristine?: boolean;
  onChange?: () => void;
};
