import { FieldBaseProps } from '@uidu/field-base';
import { Ref } from 'react';
import ReactSelect, {
  ActionMeta,
  ControlProps,
  FormatOptionLabelMeta,
  GroupBase,
  GroupProps,
  InputProps,
  MenuProps,
  MultiValueProps,
  OptionProps as ReactSelectOptionProps,
  OptionsType as RSOptionsType,
  PlaceholderProps,
  Props,
  Props as ReactSelectProps,
  SelectComponentsConfig,
  SelectInstance,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
} from 'react-select';
import { AsyncProps as ReactAsyncSelectProps } from 'react-select/async';

export type CreateSelectProps<
  TOption,
  TIsMulti extends boolean = false,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
> = Props<TOption, TIsMulti, TGroup> &
  FieldBaseProps<string | string[]> & {
    multiple?: boolean;
    /* The state of validation if used in a form */
    validationState?: any;
  };

export type SelectStatelessProps<
  TOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>,
> = Props<TOption, IsMulti, Group> & {
  componentRef: Ref<SelectInstance<TOption, IsMulti, Group>>;
  multiple?: boolean;
  disabled?: boolean;
  Component?: typeof ReactSelect;
};

export type ValidationState = 'default' | 'error' | 'success';

export interface OptionType {
  [key: string]: any;
  name: string;
  id: string | number;
}

export type OptionsType<Option = OptionType> = RSOptionsType<Option>;

export interface OptionProps<Option = OptionType>
  extends ReactSelectOptionProps<Option> {
  [key: string]: any;
  Icon?: React.ComponentType<{
    label: string;
    // label?: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    onClick?: (e: MouseEvent) => void;
    primaryColor?: string;
    secondaryColor?: string;
  }>;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

export interface SelectProps<TOptionType>
  extends ReactSelectProps<TOptionType> {
  /* This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5  */
  spacing?: 'compact' | 'default';
  /* The state of validation if used in a form */
  validationState?: ValidationState;
}

export type {
  ActionMeta,
  ControlProps,
  FormatOptionLabelMeta,
  GroupProps,
  InputProps,
  MenuProps,
  MultiValueProps,
  PlaceholderProps,
  ReactAsyncSelectProps,
  ReactSelectProps,
  SelectComponentsConfig,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
};
