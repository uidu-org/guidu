import { FieldBaseProps, WrapperProps } from '@uidu/field-base';
import { ControllerStateAndHelpers, DownshiftState } from 'downshift';
import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export type FieldDownshiftMenuProps<TOption> = Partial<
  ControllerStateAndHelpers<TOption>
> & {
  children: React.ReactNode;
  field?: ControllerRenderProps;
};

export type FieldDownshiftOptionProps<TOption> = Partial<
  ControllerStateAndHelpers<TOption>
> & {
  item: TOption;
  index: number;
  isSelected: boolean;
};

export type FieldDownshiftProps<TOption> = FieldBaseProps<string | string[]> & {
  menu?: React.FC<FieldDownshiftMenuProps<TOption>>;
  option?: React.FC<FieldDownshiftOptionProps<TOption>>;
  input?: (props) => void;
  filterOptions?: ({
    options,
    inputValue,
    isOpen,
  }: {
    options: TOption[];
    inputValue: DownshiftState<TOption>['inputValue'];
    isOpen: DownshiftState<TOption>['isOpen'];
  }) => TOption[];
  options: TOption[];
  wrapper?: React.FC<WrapperProps>;
  multiple?: boolean;
  getOptionLabel?: (option: TOption) => string;
  getOptionValue?: (option: TOption) => string;
};
