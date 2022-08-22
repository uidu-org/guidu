import React, { createContext, useContext, useMemo } from 'react';
import { FieldValues, FormProviderProps, UseFormReturn } from 'react-hook-form';
import { LayoutType, Overrides } from '../types';

const defaultContextValue = {
  layout: 'vertical' as LayoutType,
  overrides: {},
};

interface FormContextProps<T> extends FormProviderProps<T> {
  layout: LayoutType;
  overrides: any;
}

export const FormContext =
  createContext<FormContextProps<unknown>>(defaultContextValue);

function FormContextProvider<T>({
  overrides,
  layout,
  children,
  form,
}: {
  overrides?: Overrides;
  layout: LayoutType;
  children: React.ReactNode;
  form: UseFormReturn<T>;
}) {
  const value = useMemo(
    () => ({
      ...form,
      layout,
      overrides,
    }),
    [form, layout, overrides],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

function useFormContext<T extends FieldValues>() {
  const context = useContext<FormContextProps<T>>(FormContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

export { FormContextProvider, useFormContext };

export default FormContext;
