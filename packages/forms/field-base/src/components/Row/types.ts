import { FieldBaseLayout } from '../../types';

export type RowProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  layout?: FieldBaseLayout;
  label?: React.ReactNode;
  fakeLabel?: boolean;
  required?: boolean;
  showErrors?: boolean;
  elementWrapperClassName?: string;
  rowClassName?: string;
};
