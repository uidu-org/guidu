import Button from '@uidu/button';
import DropdownMenu, { DropdownItem } from '@uidu/dropdown-menu';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Form } from '@uidu/form';
import { ButtonItem, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import classNames from 'classnames';
import React, { useState } from 'react';
import useDefaultForm from '../../form/examples-utils';
import FieldDownshift, {
  FieldDownshiftMenuProps,
  FieldDownshiftOptionProps,
} from '../src';

const items = [
  { value: 'Stuck', bg: 'rgb(226, 68, 92)' },
  { value: 'Working on it', bg: 'rgb(253, 171, 61)' },
  { value: 'Done', bg: 'rgb(0, 200, 117)' },
  { value: 'Waiting for review', bg: 'rgb(87, 155, 252)' },
  { value: '', bg: 'rgb(196, 196, 196)' },
];

function DPMenu<T>({
  selectedItem,
  children,
  ...rest
}: FieldDownshiftMenuProps<T>) {
  console.log(rest);
  return (
    <DropdownMenu
      ref={rest.innerRef}
      trigger={
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: selectedItem
              ? selectedItem.bg
              : 'rgb(196, 196, 196)',
            color: 'white',
            height: 48,
            width: 160,
          }}
        >
          {selectedItem ? selectedItem.value : 'Ciao'}
        </div>
      }
    >
      <div style={{ padding: '0 4px 0' }}>{children}</div>
      <div className="p-3 border-top">Aggiungi uno status</div>
    </DropdownMenu>
  );
}

function PopupMenu({
  selectedItem,
  children,
  ...rest
}: FieldDownshiftMenuProps) {
  const { isOpen, toggleMenu } = rest;
  return (
    <Popup
      isOpen={isOpen}
      placement="bottom"
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          onClick={toggleMenu}
          style={{
            backgroundColor: selectedItem
              ? selectedItem.bg
              : 'rgb(196, 196, 196)',
            color: 'white',
            height: 48,
            width: 160,
          }}
        >
          {selectedItem ? selectedItem.value : 'Ciao'}
        </Button>
      )}
      content={() => (
        <div tw="w-36">
          <Section>
            <div style={{ padding: '0 4px 0' }}>{children}</div>
            <div className="p-3 border-top">Aggiungi uno status</div>
          </Section>
        </div>
      )}
    />
  );
}

function Item({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<any>) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <DropdownItem
      key={item.value}
      className={classNames(
        'd-flex align-items-center justify-content-center',
        {
          'border border-primary': isSelected,
        },
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        backgroundColor: item.bg,
        color: 'white',
        height: '48px',
        marginBottom: 4,
      }}
      {...rest}
    >
      {item.value}
    </DropdownItem>
  );
}

function PopupItem({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<any>) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <ButtonItem
      key={index}
      className={classNames(
        'd-flex align-items-center justify-content-center',
        {
          'border border-primary': isSelected,
        },
      )}
      onClick={(e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      style={{
        backgroundColor: item.bg,
        color: 'white',
        height: '48px',
        marginBottom: 4,
      }}
      {...rest}
    >
      {item.value}
    </ButtonItem>
  );
}

export default function Basic() {
  const defaultForm = useDefaultForm();
  const [selectedValue, setSelectedValue] = useState(items[2].value);
  return (
    <Form {...defaultForm} footerRenderer={() => null}>
      <FieldDownshift
        {...inputDefaultProps}
        value={selectedValue}
        onChange={(name, value) => setSelectedValue(value)}
        layout="elementOnly"
        menu={DPMenu}
        option={Item}
        getOptionValue={({ value }) => value}
        options={items}
      />
      <FieldDownshift
        {...inputDefaultProps}
        name="foo2"
        value={selectedValue}
        onChange={(name, value) => setSelectedValue(value)}
        layout="elementOnly"
        menu={PopupMenu}
        option={PopupItem}
        getOptionValue={({ value }) => value}
        options={items}
      />
    </Form>
  );
}
