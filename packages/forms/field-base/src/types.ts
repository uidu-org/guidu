import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldName,
  FieldValue,
  FieldValues,
  RegisterOptions,
  UseControllerProps as UseReactHookControllerProps,
  UseControllerReturn as UseReactHookControllerReturn,
} from 'react-hook-form';
import { WrapperProps } from './components/Wrapper/types';

export interface UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
> extends UseReactHookControllerProps<TFieldValues> {
  onChange: (
    name: FieldName<TFieldValues>,
    value: FieldValue<TFieldValues>,
    otherProps?: {},
  ) => void;
}

export interface UseControllerReturn<
  TFieldValues extends FieldValues = FieldValues,
> extends UseReactHookControllerReturn<TFieldValues> {
  onChange: (
    name: FieldName<TFieldValues>,
    value: FieldValue<TFieldValues>,
    otherProps?: {},
  ) => void;
  control: Control<TFieldValues>;
  id: string;
  wrapperProps: Partial<WrapperProps>;
  inputProps: ControllerRenderProps<TFieldValues> & {
    id: string;
    hasError?: boolean;
    fieldState: ControllerFieldState;
  };
}

export type FieldBaseStatelessProps<
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerReturn<TFieldValues>['inputProps'];

export type FieldBaseProps<TValue = unknown> = WrapperProps & {
  /** The name of the submitted field. */
  name: string;

  /** The name of the submitted field. */
  value?: TValue;

  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;

  className?: string;
  /** Function that is called whenever the state of the checkbox changes. It will
   be called with an object containing the react synthetic event. Use currentTarget to get value, name and checked */
  onChange?: (name: string, value: TValue, otherProps?: any) => void;
};
