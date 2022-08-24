import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes, ReactNode } from 'react';

export type FieldTimeIntervalOption = {
  id: string;
  name: string;
  [key: string]: string | ReactNode;
};

export type FieldTimeProps = {
  asSelect?: boolean;
  interval?: number;
  start?: number;
  end?: number;
  options?: FieldTimeIntervalOption[];
} & FieldBaseProps<string> &
  FieldTimeStatelessProps;

export type FieldTimeStatelessProps = AllHTMLAttributes<HTMLInputElement>;
