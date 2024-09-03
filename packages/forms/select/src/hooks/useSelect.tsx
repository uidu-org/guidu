import { useCallback, useMemo } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import {
  ActionMeta,
  GroupBase,
  mergeStyles,
  Options,
  OptionsOrGroups,
  Props,
} from 'react-select';
import * as defaultComponents from '../components';
import MultiValueLabel from '../components/MultiValueLabel';
import Option from '../components/Option';
import SingleValue from '../components/SingleValue';
import { baseStyles } from '../styles';

export interface UseSelectProps<
  TOption,
  TIsMulti extends boolean,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
> extends Omit<Props<TOption, TIsMulti, TGroup>, 'value'> {
  multiple?: boolean;
  disabled?: boolean;
  fieldState: ControllerFieldState;
  value: string | string[];
  handleChange: (
    value: string,
    option: TOption,
    actionMeta: ActionMeta<TOption>,
  ) => void;
}

export interface UseSelectReturn<
  TOption,
  TIsMulti extends boolean,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
> extends Props<TOption, TIsMulti, TGroup> {
  getValue: () => TOption | TOption[];
}

export function useSelect<
  TOption,
  TIsMulti extends boolean,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
>({
  handleChange,
  multiple,
  disabled,
  options,
  value,
  fieldState,
  styles: propStyles,
  components = {
    Option,
    SingleValue,
    MultiValueLabel,
  },
  ...rest
}: UseSelectProps<TOption, TIsMulti, TGroup>): UseSelectReturn<
  TOption,
  TIsMulti,
  TGroup
> {
  const makeComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components],
  );

  const flatten = (arr: OptionsOrGroups<TOption, any>): Options<TOption> =>
    arr.reduce(
      (acc, val) =>
        Array.isArray(val.options)
          ? acc.concat(flatten(val.options))
          : acc.concat(val),
      [],
    );

  const getOptionLabel = useCallback((option: TOption) => option.name, []);
  const getOptionValue = useCallback((option: TOption) => option.id, []);

  const styles = mergeStyles(baseStyles(fieldState), propStyles);

  const selectProps = {
    getOptionLabel,
    getOptionValue,
    components: makeComponents,
    ...rest,
    isMulti: multiple,
    isDisabled: disabled,
    styles,
    options,
  };

  const getValue = () => {
    if (value === undefined) return '';

    const opts = flatten(options);
    const cleanedValue = multiple
      ? opts.filter((o) =>
          (value || []).includes(selectProps.getOptionValue(o)),
        )
      : opts.find((o) => selectProps.getOptionValue(o) === value);

    return cleanedValue || '';
  };

  const onChange: Props<TOption, TIsMulti>['onChange'] = (
    option,
    actionMeta,
  ) => {
    if (multiple) {
      return handleChange(
        option ? option.map((v) => selectProps.getOptionValue(v)) : '',
        option,
        actionMeta,
      );
    }
    return handleChange(
      option ? selectProps.getOptionValue(option) : '',
      option,
      actionMeta,
    );
  };

  return {
    ...selectProps,
    getValue,
    value: getValue(),
    onChange,
  };
}
