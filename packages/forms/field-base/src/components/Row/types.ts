import { StyledComponent } from 'styled-components';
import { FieldBaseLayout } from '../../types';

export type RowProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  layout?: FieldBaseLayout;
  label?: React.ReactNode | string;
  fakeLabel?: boolean;
  required?: boolean;
  showErrors?: boolean;
  overrides: Record<
    string,
    { component: StyledComponent<any, any>; props?: {}; style?: {} }
  >;
};
