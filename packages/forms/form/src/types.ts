import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { StyledComponent } from 'styled-components';

export type Overrides = Record<
  string,
  { component: StyledComponent<any, any>; props?: {}; style?: {} }
>;

export type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  children: ReactNode;
  handleSubmit: FormHandleSubmit;
  footerRenderer: (
    { loading, canSubmit }: { loading: boolean; canSubmit: boolean },
    form: UseFormReturn<T>,
    handleSubmit: (model, resetForm) => void,
  ) => void;
  withLoader?: boolean;
  autoComplete?: string;
  className?: string;
  // formsy
  layout?: LayoutType;
  overrides?: Overrides;
  id?: string;
};

export type FormSectionProps = {
  children?: ReactNode;
  name: string | ReactNode;
  layout?: LayoutType;
  description?: string | ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  hideHelpers?: boolean;
};
