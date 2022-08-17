import { ReactNode } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { InputGroupProps } from '../InputGroup';
import { RowProps } from '../Row/types';

export type WrapperProps = RowProps &
  InputGroupProps & {
    errorMessages?: Array<any>;
    floatLabel?: boolean | string | ReactNode;
    help?: string | ReactNode;
    id?: string;
    type?: string;
    field?: ControllerRenderProps;
    fieldState?: ControllerFieldState;
  };
