import { FieldBaseProps } from '@uidu/field-base';
import { DownshiftState, PropGetters } from 'downshift';
import * as React from 'react';

export type FieldDownshiftMenuProps<TOption> = {
  isOpen: boolean;
  selectedItem: TOption;
  children: React.ReactNode;
  getMenuProps: PropGetters<TOption>['getMenuProps'];
};

export type FieldDownshiftOptionProps<TOption> = {
  item: TOption;
  index: number;
  isSelected: boolean;
  highlightedIndex?: number;
  scope?: string;
  getItemProps: PropGetters<TOption>['getItemProps'];
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
  wrapper?: React.ComponentClass;
  scope?: string;
  multiple?: boolean;
  getOptionLabel?: (option: TOption) => string;
  getOptionValue?: (option: TOption) => string | number;
};
