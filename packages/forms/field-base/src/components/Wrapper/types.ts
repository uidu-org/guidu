import { InputGroupProps } from '../InputGroup';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps &
  InputGroupProps & {
    errorMessages?: Array<any>;
    floatLabel?: boolean | string | React.ReactNode;
    help?: string | React.ReactNode;
    id?: string;
    type?: string;
  };
