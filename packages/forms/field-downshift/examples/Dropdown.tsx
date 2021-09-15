import Button from '@uidu/button';
import DropdownMenu, { DropdownItem } from '@uidu/dropdown-menu';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Form } from '@uidu/form';
import { ButtonItem, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import classNames from 'classnames';
import React, { useState } from 'react';
import { formDefaultProps } from '../../form/examples-utils';
import FieldDownshift from '../src';

const items = [
  { value: 'Stuck', bg: 'rgb(226, 68, 92)' },
  { value: 'Working on it', bg: 'rgb(253, 171, 61)' },
  { value: 'Done', bg: 'rgb(0, 200, 117)' },
  { value: 'Waiting for review', bg: 'rgb(87, 155, 252)' },
  { value: '', bg: 'rgb(196, 196, 196)' },
];

const DPMenu = ({ selectedItem, children, ref, ...rest }) => {
  console.log(rest);
  return (
    <DropdownMenu
      ref={ref}
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
};

const PopupMenu = ({ selectedItem, children, ref, ...rest }) => {
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
        <div ref={ref} tw="w-36">
          <Section>
            <div style={{ padding: '0 4px 0' }}>{children}</div>
            <div className="p-3 border-top">Aggiungi uno status</div>
          </Section>
        </div>
      )}
    ></Popup>
  );
};

const Item = ({ item, index, isSelected, getItemProps }) => {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <DropdownItem
      key={index}
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
};

const PopupItem = ({ item, index, isSelected, getItemProps }) => {
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
    </ButtonItem>
  );
};

export default function Basic({}) {
  const [selectedValue, setSelectedValue] = useState(items[2].value);
  return (
    <Form {...formDefaultProps} footerRenderer={() => null}>
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
