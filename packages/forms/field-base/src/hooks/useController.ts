import { useFormContext } from '@uidu/form';
import { useId, useMemo } from 'react';
import {
  FieldValues,
  useController as useReactHookFormController,
} from 'react-hook-form';
import { UseControllerProps, UseControllerReturn } from '../types';

export default function useController<
  TFieldValues extends FieldValues = FieldValues,
>({
  onChange = () => {},
  name,
  defaultValue,
  rules = {},
  ...props
}: UseControllerProps<TFieldValues>): UseControllerReturn<TFieldValues> {
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState, formState } =
    useReactHookFormController<TFieldValues>({
      control,
      name,
      rules,
      defaultValue,
    });
  const id = useId();

  const wrapperProps: UseControllerReturn['wrapperProps'] = useMemo(
    () => ({
      id,
      fieldState,
      ...props,
    }),
    [id, fieldState, props],
  );

  const inputProps: UseControllerReturn['inputProps'] = useMemo(
    () => ({
      ...field,
      fieldState,
      $hasError: !!fieldState?.error,
      id,
    }),
    [field, id, fieldState],
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
