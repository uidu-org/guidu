import { useController, Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React, { useCallback } from 'react';
import { FieldDownshiftProps } from '../types';

function FieldDownshift<
  T,
  TOption extends { id: string | number; name: string },
>({
  wrapper: WrapperComponent = FieldWrapper,
  multiple = false,
  input = null,
  onChange = () => {},
  getOptionValue = (option) => option.id,
  getOptionLabel = (option) => option.name,
  filterOptions = (props) => props.options,
  option: itemRenderer = ({ item, ...rest }) => (
    <div {...rest}>{item.name}</div>
  ),
  menu = ({ children, ...rest }) => <div {...rest}>{children}</div>,
  options,
  value,
  scope,
  name,
  ...otherProps
}: FieldDownshiftProps<T, TOption>) {
  const { field, wrapperProps } = useController({
    name,
    defaultValue: value || multiple ? [] : '',
    onChange,
    ...otherProps,
  });

  const getValue = useCallback(() => {
    if (field.value === undefined) return undefined;

    const cleanedValue = multiple
      ? options.filter((o) => field.value.includes(getOptionValue(o)))
      : options.find((o) => getOptionValue(o) === field.value);

    return cleanedValue;
  }, [field.value, multiple, options, getOptionValue]);

  const onSelect = (selectedItem: TOption) => {
    if (multiple) {
      if (
        field.value &&
        field.value.indexOf(getOptionValue(selectedItem)) >= 0
      ) {
        const newValue = field.value.filter(
          (v) => v !== getOptionValue(selectedItem),
        );
        field.onChange(newValue);
        onChange(name, newValue, { option: selectedItem });
        return undefined;
      }
      // add item
      const newValue = [
        ...options
          .filter((o) => field.value.indexOf(getOptionValue(o)) >= 0)
          .map(getOptionValue),
        getOptionValue(selectedItem),
      ];
      field.onChange(newValue);
      onChange(name, newValue, { option: selectedItem });
      return undefined;
    }
    if (selectedItem === '') {
      field.onChange('');
      onChange(name, '');
      return undefined;
    }

    field.onChange(getOptionValue(selectedItem));
    onChange(name, getOptionValue(selectedItem), { option: selectedItem });
    return undefined;
  };

  const isSelected = (item: TOption) => {
    if (multiple) {
      if (field.value) {
        return field.value.indexOf(getOptionValue(item)) >= 0;
      }
      return null;
    }
    if (field.value) {
      return field.value === getOptionValue(item);
    }
    return null;
  };

  const renderItem = ({ item, index, ...rest }) =>
    itemRenderer({
      ...rest,
      item,
      index,
      isSelected: isSelected(item),
    });

  const selectedItem = getValue();

  return (
    <Downshift
      onSelect={onSelect}
      itemToString={(item) => getOptionLabel({ item })}
      initialSelectedItem={selectedItem}
      inputValue={field.value}
      // selectedItem={selectedItem}
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
          {input && input({ ...getInputProps() })}
          {menu({
            ...getMenuProps({}),
            ...rest,
            isOpen,
            selectedItem,
            children: filterOptions({ options, inputValue, isOpen }).map(
              (item, index) =>
                renderItem({
                  ...rest,
                  item,
                  index,
                  scope,
                  getItemProps,
                }),
            ),
          })}
        </WrapperComponent>
      )}
    </Downshift>
  );
}

export default FieldDownshift;
