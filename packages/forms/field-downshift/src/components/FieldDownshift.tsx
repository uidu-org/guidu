import { ComponentHOC, Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React, { Component } from 'react';
import { FieldDownshiftProps } from '../types';

class FieldDownshift extends Component<FieldDownshiftProps> {
  static defaultProps = {
    wrapper: FieldWrapper,
    multiple: false,
    input: null,
    onChange: () => {},
    itemsGetter: ({ items }) => items,
    item: ({ item, ...rest }) => <div {...rest}>{item.name}</div>,
    menu: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  };

  onChange = selectedItem => {
    const { onSetValue, onChange, name, multiple, items, value } = this.props;

    if (multiple) {
      if (value && value.map(v => v.id).indexOf(selectedItem.id) >= 0) {
        const newValue = value
          .map(v => v.id)
          .filter(v => v !== selectedItem.id);
        onSetValue(items.filter(o => newValue.indexOf(o.id) >= 0));
        onChange(name, items.filter(o => newValue.indexOf(o.id) >= 0));
      } else {
        // add item
        const newValue = [
          ...items.filter(o => value.map(v => v.id).indexOf(o.id) >= 0),
          selectedItem,
        ];
        onSetValue(newValue);
        onChange(name, newValue);
      }
    } else {
      if (selectedItem === '') {
        onSetValue('');
        onChange(name, '');
      } else {
        onSetValue(selectedItem);
        onChange(name, selectedItem);
      }
    }
  };

  renderItem = ({ item, index, ...rest }) => {
    const { multiple, value, item: itemRenderer } = this.props;
    const isSelected = multiple
      ? value && value.map(v => v.id).indexOf(item.id) >= 0
      : value && value.id === item.id;

    return itemRenderer({
      item,
      index,
      isSelected,
      ...rest,
    });
  };

  render() {
    const {
      items,
      wrapper: WrapperComponent,
      input,
      menu,
      itemsGetter,
      value,
      scope,
      multiple,
    } = this.props;

    return (
      <Downshift
        onSelect={this.onChange}
        itemToString={item => (item ? item.value : '')}
        initialSelectedItem={
          multiple
            ? items.filter(
                i => value && value.map(v => v.id).indexOf(i.id) >= 0,
              )
            : value
        }
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
              {...this.props}
              {...getRootProps({ refKey: 'componentRef' })}
            >
              {input && input({ ...getInputProps() })}
              {menu({
                ...getMenuProps({}),
                children: itemsGetter({ items, inputValue, isOpen }).map(
                  (item, index) =>
                    this.renderItem({
                      item,
                      index,
                      scope,
                      ...getItemProps({ item, index }),
                      ...rest,
                    }),
                ),
              })}
            </WrapperComponent>
          );
        }}
      </Downshift>
    );
  }
}

export default ComponentHOC(FieldDownshift);
