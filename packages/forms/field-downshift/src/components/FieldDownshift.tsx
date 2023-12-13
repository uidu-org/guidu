/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React, { useCallback } from 'react';
import { FieldDownshiftProps } from '../types';

function FieldDownshift<
  TOption extends {
    id: string | number;
    name: string;
  },
>({
  wrapper: WrapperComponent = FieldWrapper,
  multiple = false,
  onChange = noop,
  getOptionValue = (option) => String(option.id),
  getOptionLabel = (option) => option.name,
  filterOptions = (props) => props.options,
  option: Option = ({ item, ...rest }) => <div {...rest}>{item.name}</div>,
  input: Input = null,
  menu: Menu = ({ children, ...rest }) => <div {...rest}>{children}</div>,
  options,
  value: defaultValue = '',
  name,
  ...otherProps
}: FieldDownshiftProps<TOption>) {
  const { field, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    ...otherProps,
  });

  const getValue = useCallback(() => {
    if (field.value === undefined) return undefined;

    const cleanedValue = multiple
      ? options.filter((o) =>
          (field.value as string[]).includes(getOptionValue(o)),
        )
      : options.find((o) => getOptionValue(o) === field.value);

    return cleanedValue;
  }, [field.value, multiple, options, getOptionValue]);

  const onSelect = (selectedItem: TOption) => {
    if (multiple) {
      if (
        ((field.value as string[]) || []).indexOf(
          getOptionValue(selectedItem),
        ) >= 0
      ) {
        const newValue = ((field.value as string[]) || []).filter(
          (v) => v !== getOptionValue(selectedItem),
        );
        field.onChange(newValue);
        onChange(name, newValue, { option: selectedItem });
        return undefined;
      }
      // add item
      const newValue = [
        ...options
          .filter(
            (o) =>
              ((field.value as string[]) || []).indexOf(getOptionValue(o)) >= 0,
          )
          .map(getOptionValue),
        getOptionValue(selectedItem),
      ];
      field.onChange(newValue);
      onChange(name, newValue, { option: selectedItem });
      return undefined;
    }

    field.onChange(getOptionValue(selectedItem));
    onChange(name, getOptionValue(selectedItem), { option: selectedItem });
    return undefined;
  };

  const isSelected = (item: TOption) => {
    if (multiple) {
      if (field.value) {
        return (field.value as string[]).indexOf(getOptionValue(item)) >= 0;
      }
      return null;
    }
    if (field.value) {
      return field.value === getOptionValue(item);
    }
    return null;
  };

  const selectedItem = getValue();

  return (
    <Downshift<TOption | TOption[]>
      onSelect={onSelect}
      itemToString={(item) => {
        if (item) {
          return getOptionLabel(item);
        }
        return '';
      }}
      initialSelectedItem={selectedItem}
      inputValue={field.value as string}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        ...rest
      }) => (
        <WrapperComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...wrapperProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRootProps({ refKey: 'componentRef' })}
        >
          {Input && <Input {...getInputProps()} />}
          <Menu
            getMenuProps={getMenuProps}
            isOpen={isOpen}
            selectedItem={selectedItem}
            field={field}
            {...rest}
          >
            {filterOptions({ options, inputValue, isOpen }).map(
              (item, index) => (
                <Option
                  getItemProps={getItemProps}
                  key={getOptionValue(item)}
                  index={index}
                  item={item}
                  isSelected={isSelected(item)}
                  {...rest}
                />
              ),
            )}
          </Menu>
        </WrapperComponent>
      )}
    </Downshift>
  );
}

export default FieldDownshift;
