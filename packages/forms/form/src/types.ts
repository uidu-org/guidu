import { Value } from 'classnames';
import Formsy from 'formsy-react';
import { FormsyProps } from 'formsy-react/dist/Formsy';
import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';

export type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps = {
  children: ReactNode;
  onChange?: FormsyProps['onChange'];
  handleSubmit: FormHandleSubmit;
  footerRenderer: (
    { loading, canSubmit }: { loading: boolean; canSubmit: boolean },
    form: Formsy,
    handleSubmit: (model, resetForm) => void,
  ) => void;
  withLoader?: boolean;
  inputsWrapperProps?: any;
  autoComplete?: string;
  className?: Value;
  // formsy
  layout?: LayoutType;
  rowClassName?: Value;
  validateBeforeSubmit?: boolean;
  validatePristine?: boolean;
  disabled?: boolean;
  overrides?: {} | { [key: string]: any };
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
