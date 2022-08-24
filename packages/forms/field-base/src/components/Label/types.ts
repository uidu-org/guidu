import { LayoutType } from '@uidu/form';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

export type LabelProps<T> = {
  layout: LayoutType;
  label: React.ReactNode | string;
  htmlFor: string;
  fakeLabel: boolean;
  required: boolean;
  field?: ControllerRenderProps<T>;
  fieldState?: ControllerFieldState;
};
