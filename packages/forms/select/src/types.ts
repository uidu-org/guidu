import {
  ActionMeta,
  ControlProps,
  FormatOptionLabelMeta,
  GroupProps,
  GroupType,
  IndicatorComponentType,
  IndicatorProps,
  InputProps,
  MenuListComponentProps,
  MenuProps,
  MultiValueProps,
  OptionProps as ReactSelectOptionProps,
  OptionsType as RSOptionsType,
  PlaceholderProps,
  Props as ReactSelectProps,
  SelectComponentsConfig,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
  ValueType,
} from 'react-select';
import { AsyncProps as ReactAsyncSelectProps } from 'react-select/async';

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

export interface SelectProps<OptionType> extends ReactSelectProps<OptionType> {
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
  GroupType,
  IndicatorComponentType,
  IndicatorProps,
  InputProps,
  MenuListComponentProps,
  MenuProps,
  MultiValueProps,
  PlaceholderProps,
  ReactAsyncSelectProps,
  ReactSelectProps,
  SelectComponentsConfig,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
  ValueType,
};
