import { FieldTextStateless } from '@uidu/field-text';
import Form from '@uidu/form';
import React from 'react';
import tw from 'twin.macro';
import { inputDefaultProps } from '../../field-base/examples-utils';
import useDefaultForm from '../../form/examples-utils';
import FieldDownshift, { FieldDownshiftMenuProps } from '../src';

const options = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

function Menu({
  field,
  getMenuProps,
  ...props
}: FieldDownshiftMenuProps<{ value: string }>) {
  return (
    <div
      tw="space-y-4 flex flex-col"
      onBlur={field.onBlur}
      {...getMenuProps({
        ref: (e) => {
          console.log(e);
          if (e) {
            field.ref(e);
            return e.current;
          }
        },
      })}
      {...props}
    />
  );
}

function Item({ item, highlightedIndex, index, isSelected, getItemProps }) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <a
      key={index}
      href="#"
      css={[
        tw`p-4 border rounded`,
        highlightedIndex === index && tw`bg-gray-50`,
        isSelected && tw`bg-primary bg-opacity-10`,
      ]}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      {item.value}
    </a>
  );
}

const Input = (props) => <FieldTextStateless type="search" {...props} />;

export default function Basic() {
  const defaultForm = useDefaultForm();

  return (
    <Form {...defaultForm}>
      <FieldDownshift
        {...inputDefaultProps}
        label="Enter a fruit"
        name="one"
        menu={Menu}
        option={Item}
        options={options}
        value={options[0].value}
        getOptionValue={({ value }) => value}
        onChange={console.log}
        rules={{ required: { value: true, message: 'Field is required' } }}
      />
      <br />
      <h6>Multiple</h6>
      <br />
      <FieldDownshift
        {...inputDefaultProps}
        name="test"
        label="Enter a fruit"
        menu={Menu}
        option={Item}
        options={options}
        value={[options[0].value, options[2].value]}
        getOptionValue={({ value }) => value}
        onChange={console.log}
        multiple
        rules={{ required: { value: true, message: 'Field is required' } }}
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
        name="bar"
        options={options}
        value={options[0].value}
        getOptionValue={({ value }) => value}
        filterOptions={({ options, inputValue, isOpen }) =>
          isOpen
            ? options.filter(
                (item) => !inputValue || item.value.includes(inputValue),
              )
            : []
        }
        required
      />
    </Form>
  );
}
