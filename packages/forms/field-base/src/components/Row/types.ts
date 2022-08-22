import { LayoutType, Overrides } from '@uidu/form';

export type RowProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  layout?: LayoutType;
  label?: React.ReactNode | string;
  fakeLabel?: boolean;
  required?: boolean;
  showErrors?: boolean;
  overrides?: Overrides;
};
