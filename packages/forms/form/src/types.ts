import { ClassValue } from 'classnames/types';

export type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps = {
  children: React.ReactNode;
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
