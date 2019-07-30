import { ComponentHOC, Wrapper as FieldWrapper } from '@uidu/field-base';
import Downshift from 'downshift';
import React, { PureComponent } from 'react';
import { FieldDownshiftProps } from '../types';

class FieldDownshift extends PureComponent<FieldDownshiftProps> {
  static defaultProps = {
    wrapper: FieldWrapper,
    input: null,
    onChange: () => {},
    itemsGetter: ({ items }) => items,
    item: ({ item, ...rest }) => <div {...rest}>{item.name}</div>,
    menu: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  };

  onChange = value => {
    const { onSetValue, onChange, name } = this.props;
    if (value === '') {
      onSetValue('');
      onChange(name, '');
    } else {
      onSetValue(value);
      onChange(name, value);
    }
  };

  render() {
    const {
      items,
      wrapper: WrapperComponent,
      input,
      menu,
      item: itemRenderer,
      itemsGetter,
      value,
    } = this.props;
    return (
      <Downshift
        onChange={this.onChange}
        itemToString={item => (item ? item.value : '')}
        initialSelectedItem={value}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => {
          return (
            <WrapperComponent
              {...this.props}
              {...getRootProps({ refKey: 'componentRef' })}
            >
              {input && input({ ...getInputProps() })}
              {menu({
                ...getMenuProps({}),
                selectedItem,
                children: itemsGetter({ items, inputValue, isOpen }).map(
                  (item, index) =>
                    itemRenderer({
                      item,
                      index,
                      highlightedIndex,
                      selectedItem,
                      ...getItemProps({ item, index }),
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
