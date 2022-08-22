import { ReactNode } from 'react';
import { InputGroupProps } from '../InputGroup/types';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps &
  InputGroupProps & {
    floatLabel?: boolean | string | ReactNode;
    help?: string | ReactNode;
    id?: string;
    type?: string;
  };
