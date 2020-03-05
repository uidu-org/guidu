import { FieldBaseProps } from '@uidu/field-base';
import * as React from 'react';

export type FieldDownshiftProps = FieldBaseProps & {
  menu?: (props) => void;
  option?: (props) => void;
  filterOptions?: (props) => Array<any>;
  options: Array<any>;
  wrapper?: React.ComponentClass;
  input?: (props) => void;
  scope?: string;
  multiple?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => string;
};
