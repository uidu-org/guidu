/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React, { useCallback } from 'react';
import { FieldDownshiftProps } from '../types';

function FieldDownshift<
  TOption extends { id: string | number; name: string; [key: string]: any } = {
    id: string | number;
    name: string;
  },
>({
  wrapper: WrapperComponent = FieldWrapper,
  multiple = false,
  onChange = () => {},
  getOptionValue = (option) => option.id,
  getOptionLabel = (option) => option.name,
  filterOptions = (props) => props.options,
  option: Option = ({ item, ...rest }) => <div {...rest}>{item.name}</div>,
  input: Input = null,
  menu: Menu = ({ children, ...rest }) => <div {...rest}>{children}</div>,
  options,
  value,
  scope,
  name,
  ...otherProps
}: FieldDownshiftProps<TOption>) {
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

  const selectedItem = getValue();

  return (
    <Downshift<TOption>
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
        highlightedIndex,
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
            {...getMenuProps({ refKey: 'innerRef' })}
            getMenuProps={getMenuProps}
            isOpen={isOpen}
            selectedItem={selectedItem}
            {...rest}
          >
            {filterOptions({ options, inputValue, isOpen }).map(
              (item, index) => (
                <Option
                  {...rest}
                  key={getOptionValue(item)}
                  highlightedIndex={highlightedIndex}
                  index={index}
                  item={item}
                  isSelected={isSelected(item)}
                  scope={scope}
                  getItemProps={getItemProps}
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
