import { Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React from 'react';
import { FieldDownshiftProps } from '../types';

function FieldDownshift({
  wrapper: WrapperComponent = FieldWrapper,
  multiple = false,
  input = null,
  onChange = () => {},
  getOptionValue = ({ id }) => id,
  getOptionLabel = ({ name }) => name,
  filterOptions = ({ options }) => options,
  option: itemRenderer = ({ item, ...rest }) => (
    <div {...rest}>{item.name}</div>
  ),
  menu = ({ children, ...rest }) => <div {...rest}>{children}</div>,
  options,
  value,
  scope,
  onSetValue,
  name,
  ...otherProps
}: FieldDownshiftProps) {
  const getValue = () => {
    if (value === undefined) return undefined;

    const cleanedValue = multiple
      ? options.filter((o) => value.includes(getOptionValue(o)))
      : options.find((o) => getOptionValue(o) === value);

    return cleanedValue;
  };

  const onSelect = (selectedItem) => {
    if (multiple) {
      if (value && value.indexOf(getOptionValue(selectedItem)) >= 0) {
        const newValue = value.filter(
          (v) => v !== getOptionValue(selectedItem),
        );
        onSetValue(newValue);
        onChange(name, newValue, { option: selectedItem });
      } else {
        // add item
        const newValue = [
          ...options
            .filter((o) => value.indexOf(getOptionValue(o)) >= 0)
            .map(getOptionValue),
          getOptionValue(selectedItem),
        ];
        onSetValue(newValue);
        onChange(name, newValue, { option: selectedItem });
      }
    } else {
      if (selectedItem === '') {
        onSetValue('');
        onChange(name, '');
      } else {
        onSetValue(getOptionValue(selectedItem));
        onChange(name, getOptionValue(selectedItem), { option: selectedItem });
      }
    }
  };

  const isSelected = ({ item }) => {
    if (multiple) {
      if (value) {
        return value.indexOf(getOptionValue(item)) >= 0;
      }
      return null;
    }
    if (value) {
      return value === getOptionValue(item);
    }
    return null;
  };

  const renderItem = ({ item, index, ...rest }) => {
    return itemRenderer({
      ...rest,
      item,
      index,
      isSelected: isSelected({ item }),
    });
  };

  const selectedItem = getValue();

  return (
    <Downshift
      onSelect={onSelect}
      itemToString={(item) => getOptionLabel({ item })}
      initialSelectedItem={selectedItem}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        ...rest
      }) => {
        return (
          <WrapperComponent
            {...otherProps}
            {...getRootProps({ refKey: 'componentRef' })}
          >
            {input && input({ ...getInputProps() })}
            {menu({
              ...getMenuProps({}),
              selectedItem,
              children: filterOptions({ options, inputValue, isOpen }).map(
                (item, index) =>
                  renderItem({
                    item,
                    index,
                    scope,
                    getItemProps,
                  }),
              ),
            })}
          </WrapperComponent>
        );
      }}
    </Downshift>
  );
}

export default FieldDownshift;
