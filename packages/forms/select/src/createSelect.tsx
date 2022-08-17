import { FieldBaseProps, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { mergeStyles, Props } from 'react-select';
import * as defaultComponents from './components';
import MultiValueLabel from './components/MultiValueLabel';
import Option from './components/Option';
import SingleValue from './components/SingleValue';
import baseStyles from './styles';

export type CreateSelectProps<T> = Props<T> & {
  enableAnimation?: boolean;
  components?: any;
  multiple?: boolean;
} & FieldBaseProps<unknown> & {
    /* This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5  */
    spacing?: 'compact' | 'default';
    /* The state of validation if used in a form */
    validationState?: any;
  };

const createSelect = <TOriginalProps extends { id: string; name: string }>(
  Component: React.ComponentType<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps & CreateSelectProps<TOriginalProps>;

  const useSelect = (props: ResultProps) => {
    const { field, wrapperProps } = useController({
      name: props.name,
      defaultValue: props.value,
      onChange: props.onChange,
      ...props,
    });

    const {
      componentRef,
      name,
      onChange = () => {},
      styles,
      validationState,
      spacing,
      multiple,
      options,
      onClickPreventDefault = true,
      tabSelectsValue = true,
      isClearable = true,
      isSearchable = true,
      getOptionLabel = ({ name }) => name,
      getOptionValue = ({ id }) => id,
      components = {
        Option,
        SingleValue,
        MultiValueLabel,
      },
      disabled,
      ...rest
    } = props;

    const handleChange = (value, option, actionMeta) => {
      field.onChange(value);
      onChange(field.name, value, { option, actionMeta });
    };

    const flatten = (arr) =>
      arr.reduce(
        (acc, val) =>
          Array.isArray(val.options)
            ? acc.concat(flatten(val.options))
            : acc.concat(val),
        [],
      );

    const clean = (x) => x.trim();
    const toArray = (str) => str.split(',').map(clean);
    const toString = (arr) => arr.join(',');

    const getValue = () => {
      if (field.value === undefined) return undefined;

      const opts = flatten(options);
      const cleanedValue = multiple
        ? opts.filter((o) => field.value.includes(getOptionValue(o)))
        : opts.find((o) => getOptionValue(o) === field.value);

      return cleanedValue;
    };

    const isCompact = spacing === 'compact';

    return (
      <Wrapper {...wrapperProps}>
        <Component
          {...(props as ResultProps)}
          {...field}
          isMulti={multiple}
          value={getValue()}
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          formatCreateLabel={(inputValue) => `Create new...${inputValue}`}
          isDisabled={!!disabled}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            name: optionLabel,
            __isNew__: true,
          })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          components={{
            ...defaultComponents,
            ...components,
          }}
          styles={mergeStyles(baseStyles(validationState, isCompact), styles)}
          onChange={(option, actionMeta) => {
            if (multiple) {
              return handleChange(
                option ? option.map((v) => getOptionValue(v)) : '',
                option,
                actionMeta,
              );
            }
            return handleChange(
              option ? getOptionValue(option) : '',
              option,
              actionMeta,
            );
          }}
        />
      </Wrapper>
    );
  };

  return useSelect;
};

export default createSelect;
