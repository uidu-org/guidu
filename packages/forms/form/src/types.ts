import { ClassValue } from 'classnames/types';
import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';

export type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps = {
  children: ReactNode;
  handleSubmit: FormHandleSubmit;
  footerRenderer: (
    { loading, canSubmit },
    form,
    handleSubmit: (model, resetForm) => void,
  ) => void;
  withLoader?: boolean;
  inputsWrapperProps?: any;
  autoComplete?: string;
  className?: ClassValue;
  // formsy
  elementWrapperClassName?: ClassValue;
  labelClassName?: ClassValue;
  layout?: LayoutType;
  rowClassName?: ClassValue;
  validateBeforeSubmit?: boolean;
  validatePristine?: boolean;
  disabled?: boolean;
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
