import { FieldTextStateless } from '@uidu/field-text';
import { Form } from '@uidu/form';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldDownshift from '../src';

const options = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

const Menu = props => <div className="list-group" {...props} />;

const Item = ({ item, highlightedIndex, index, isSelected, getItemProps }) => {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <a
      key={index}
      href="#"
      className={classNames('list-group-item list-group-item-action', {
        'bg-light': highlightedIndex === index,
        'list-group-item-primary': isSelected,
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
          option={Item}
          options={options}
          value={options[0].value}
          getOptionValue={({ value }) => value}
          required
        />
        <br />
        <h6>Multiple</h6>
        <br />
        <FieldDownshift
          {...inputDefaultProps}
          label="Enter a fruit"
          menu={Menu}
          option={Item}
          options={options}
          value={[options[0].value, options[2].value]}
          getOptionValue={({ value }) => value}
          multiple
          required
        />
        <br />
        <h6>With search</h6>
        <br />
        <FieldDownshift
          {...inputDefaultProps}
          input={Input}
          label="Enter a fruit"
          menu={Menu}
          option={Item}
          options={options}
          value={options[0].value}
          getOptionValue={({ value }) => value}
          filterOptions={({ options, inputValue, isOpen }) =>
            isOpen
              ? options.filter(
                  item => !inputValue || item.value.includes(inputValue),
                )
              : []
          }
          required
        />
      </Form>
    );
  }
}
