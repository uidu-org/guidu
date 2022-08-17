import { useFormContext } from '@uidu/form';
import { useId, useMemo } from 'react';
import {
  Control,
  ControllerRenderProps,
  useController as useReactHookFormController,
  UseControllerProps as UseReactHookControllerProps,
  UseControllerReturn as UseReactHookControllerReturn,
} from 'react-hook-form';
import { WrapperProps } from '../components/Wrapper/types';

export interface UseControllerProps<T> extends UseReactHookControllerProps<T> {
  onChange: (name, value: any) => void;
}

export interface UseControllerReturn<T>
  extends UseReactHookControllerReturn<T> {
  onChange: (name, value: any) => void;
  control: Control<T>;
  id: string;
  wrapperProps: Partial<WrapperProps>;
  inputProps: ControllerRenderProps<T> & { id: string };
}

export default function useController<T>({
  onChange = () => {},
  name,
  defaultValue,
  rules,
  ...props
}: UseControllerProps<T>): UseControllerReturn<T> {
  const { control } = useFormContext<T>();
  const { field, fieldState, formState } = useReactHookFormController<T>({
    control,
    name,
    rules,
    defaultValue,
  });
  const id = useId();

  const wrapperProps = useMemo(
    () => ({
      id,
      fieldState,
      ...props,
    }),
    [id, fieldState, props],
  );

  const inputProps = useMemo(
    () => ({
      ...field,
      id,
    }),
    [field, id],
  );

  return {
    field,
    fieldState,
    formState,
    control,
    id,
    wrapperProps,
    inputProps,
    onChange,
  };
}
