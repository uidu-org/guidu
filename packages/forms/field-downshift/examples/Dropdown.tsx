import Button from '@uidu/button';
import { ButtonItem, Section } from '@uidu/menu';
import Popup, { TriggerProps } from '@uidu/popup';
import classNames from 'classnames';
import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldDownshift, {
  FieldDownshiftMenuProps,
  FieldDownshiftOptionProps,
  FieldDownshiftProps,
} from '../src';

const items = [
  { value: 'Stuck', bg: 'rgb(226, 68, 92)' },
  { value: 'Working on it', bg: 'rgb(253, 171, 61)' },
  { value: 'Done', bg: 'rgb(0, 200, 117)' },
  { value: 'Waiting for review', bg: 'rgb(87, 155, 252)' },
  { value: '', bg: 'rgb(196, 196, 196)' },
];

function PopupMenu({
  selectedItem,
  children,
  getMenuProps,
  field,
  ...rest
}: FieldDownshiftMenuProps<{ value: string; bg: string }>) {
  const { isOpen, toggleMenu, closeMenu } = rest;

  return (
    <Popup
      isOpen={isOpen}
      onClose={closeMenu}
      placement="bottom"
      trigger={(triggerProps: TriggerProps) => (
        <Button
          {...triggerProps}
          ref={(e) => {
            if (e) {
              triggerProps.ref(e);
              field.ref(e);
            }
          }}
          onBlur={field.onBlur}
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
        <div tw="w-36" {...getMenuProps({})}>
          <Section>
            <div style={{ padding: '0 4px 0' }}>{children}</div>
            <div className="p-3 border-top">Aggiungi uno status</div>
          </Section>
        </div>
      )}
    />
  );
}

function PopupItem({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<{ value: string; bg: string }>) {
  const { onClick, ...rest } = getItemProps({ item, index });

  return (
    <ButtonItem
      {...rest}
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
    >
      {item.value}
    </ButtonItem>
  );
}

export default function Basic() {
  return (
    <FieldExampleScaffold<FieldDownshiftProps<any>>
      component={FieldDownshift}
      defaultValue={items[2].value}
      layout="elementOnly"
      menu={PopupMenu}
      option={PopupItem}
      getOptionValue={({ value }) => value}
      options={items}
    />
  );
}
