import { FieldBaseProps } from '@uidu/field-base';
import { DownshiftState } from 'downshift';
import * as React from 'react';

export type FieldDownshiftProps<T, TOption> = FieldBaseProps<T> & {
  menu?: (props) => void;
  option?: (props) => void;
  input?: (props) => void;
  filterOptions?: ({
    options,
    inputValue,
    isOpen,
  }: {
    options: TOption[];
    inputValue: DownshiftState['inputValue'];
    isOpen: DownshiftState['isOpen'];
  }) => TOption[];
  options: TOption[];
  wrapper?: React.ComponentClass;
  scope?: string;
  multiple?: boolean;
  getOptionLabel?: (option: TOption) => any;
  getOptionValue?: (option: TOption) => any;
};
