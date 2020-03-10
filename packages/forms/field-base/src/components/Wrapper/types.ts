import { FieldBaseLayout } from '../../types';
import { InputGroupProps } from '../InputGroup';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps &
  InputGroupProps & {
    errorMessages?: Array<any>;
    floatLabel?: boolean;
    help?: string | React.ReactNode;
    id?: string;
    layout?: FieldBaseLayout;
    type?: string;
    showErrors?: boolean;
    required?: boolean;
  };
