import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { FieldTextStateless } from '@uidu/field-text';
import { Form } from '@uidu/form';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { formDefaultProps } from '../../form/examples-utils';
import FieldDownshift from '../src';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

const Menu = props => <div className="list-group" {...props} />;

const Item = ({
  item,
  highlightedIndex,
  index,
  selectedItem,
  onClick,
  ...rest
}) => {
  return (
    <a
      key={index}
      href="#"
      className={classNames('list-group-item list-group-item-action', {
        'bg-light': highlightedIndex === index,
        'list-group-item-primary':
          selectedItem && selectedItem.value === item.value,
      })}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      {item.value}
    </a>
  );
};

const Input = props => <FieldTextStateless type="search" {...props} />;

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldDownshift
          {...inputDefaultProps}
          label="Enter a fruit"
          menu={Menu}
          item={Item}
          items={items}
          value={items[1]}
        />
        <br />
        <h6>With search</h6>
        <br />
        <FieldDownshift
          {...inputDefaultProps}
          input={Input}
          label="Enter a fruit"
          menu={Menu}
          item={Item}
          items={items}
          itemsGetter={({ items, inputValue, isOpen }) =>
            isOpen
              ? items.filter(
                  item => !inputValue || item.value.includes(inputValue),
                )
              : []
          }
        />
      </Form>
    );
  }
}
