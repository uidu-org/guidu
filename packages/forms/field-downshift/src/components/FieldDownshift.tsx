import { ComponentHOC, Wrapper as FieldWrapper } from '@uidu/field-base';
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
      ? options.filter(o => value.includes(getOptionValue(o)))
      : options.find(o => getOptionValue(o) === value);

    return cleanedValue;
  };

  const onSelect = selectedItem => {
    if (multiple) {
      if (value && value.indexOf(getOptionValue(selectedItem)) >= 0) {
        const newValue = value.filter(v => v !== getOptionValue(selectedItem));
        onSetValue(newValue);
        onChange(name, newValue);
      } else {
        // add item
        const newValue = [
          ...options
            .filter(o => value.indexOf(getOptionValue(o)) >= 0)
            .map(getOptionValue),
          getOptionValue(selectedItem),
        ];
        onSetValue(newValue);
        onChange(name, newValue);
      }
    } else {
      if (selectedItem === '') {
        onSetValue('');
        onChange(name, '');
      } else {
        onSetValue(getOptionValue(selectedItem));
        onChange(name, getOptionValue(selectedItem));
      }
    }
  };

  const renderItem = ({ item, index, ...rest }) => {
    const isSelected = multiple
      ? value.indexOf(getOptionValue(item)) >= 0
      : value === getOptionValue(item);

    return itemRenderer({
      ...rest,
      item,
      index,
      isSelected,
    });
  };

  const selectedItem = getValue();

  return (
    <Downshift
      onSelect={onSelect}
      itemToString={item => getOptionLabel({ item })}
      selectedItem={selectedItem}
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
              // selectedItem: value,
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

export default ComponentHOC(FieldDownshift);
