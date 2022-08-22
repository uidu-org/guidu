import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';
import { UseFormReturn } from 'react-hook-form';
import { StyledComponent } from 'styled-components';

export type Overrides = Record<
  string,
  { component: StyledComponent<any, any>; props?: {}; style?: {} }
>;

export type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps<T> = {
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
  icon?: FC<IconProps>;
  layout?: LayoutType;
  description?: string | ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  hideHelpers?: boolean;
};
