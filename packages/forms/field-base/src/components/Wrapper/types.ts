import { FC, ReactNode } from 'react';
import { ErrorIconProps } from '../ErrorIcon/types';
import { InputGroupProps } from '../InputGroup/types';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps &
  InputGroupProps & {
    floatLabel?: string | ReactNode;
    help?: string | ReactNode;
    id?: string;
    type?: string;
    errorIcon?: FC<ErrorIconProps>;
  };
