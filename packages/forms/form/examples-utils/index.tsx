import React from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { FormSubmit } from '../src';

const later = (delay, value) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

export function useDefaultForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues> = {},
) {
  const form = useForm({ mode: 'all', ...props });
  return {
    form,
    footerRenderer: ({
      canSubmit,
      loading,
    }: {
      canSubmit: boolean;
      loading: boolean;
    }) => <FormSubmit label="Save" canSubmit={canSubmit} loading={loading} />,
    handleSubmit: (model) => later(3000, model).then(console.log),
  };
}

export default useDefaultForm;
