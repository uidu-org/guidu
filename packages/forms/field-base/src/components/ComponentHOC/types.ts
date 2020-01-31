import { PassDownProps } from 'formsy-react/dist/Wrapper';
import { FieldBaseLayout } from '../../types';

export type ComponentHOCProps = PassDownProps<any> & {
  layout: FieldBaseLayout;
  disabled?: boolean;
  validateOnSubmit?: boolean;
  validatePristine?: boolean;
  onChange?: () => void;
};

export type ComponentValue = string | string[];

export interface RequiredFromOriginalComponentProps {
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  layout: FieldBaseLayout;
  name: string;
  value: ComponentValue;
  disabled: boolean;
  id: string;
  label: React.ReactNode;
  componentRef: React.RefObject<any>;
}
