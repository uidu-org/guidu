import { FieldBaseLayout } from '../../types';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps & {
  errorMessages?: Array<any>;
  floatLabel?: boolean;
  help?: string | React.ReactNode;
  id?: string;
  layout?: FieldBaseLayout;
  type?: string;
  showErrors?: boolean;
  required?: boolean;
};
