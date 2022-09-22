import { Table } from '@tanstack/react-table';
import Select from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function CardTypes<T>({
  tableInstance,
}: {
  tableInstance: Table<T>;
}) {
  const { getAllColumns, getState, setColumnVisibility } = tableInstance;

  const columns = getAllColumns();
  const { columnVisibility } = getState();

  const options = [{ id: 'basic', name: 'Basic' }];
  const coverField = columns.filter(
    (column) => column.columnDef.meta?.kind === 'cover',
  )[0];
  const avatarField = columns.filter(
    (column) => column.columnDef.meta?.kind === 'avatar',
  )[0];

  if (avatarField) {
    options.push({ id: 'with-avatar', name: 'With avatar only' });
  }
  if (coverField) {
    options.push({ id: 'with-cover', name: 'With cover only' });
    if (avatarField) {
      options.push({
        id: 'with-avatar-and-cover',
        name: 'With avatar & cover',
      });
    }
  }

  const handleChange = (_name, value) => {
    switch (value) {
      case 'with-avatar':
        setColumnVisibility([
          ...columnVisibility.filter((c) => c !== 'avatar'),
          'cover',
        ]);
        break;
      case 'with-cover':
        setColumnVisibility([
          ...columnVisibility.filter((c) => c !== 'cover'),
          'avatar',
        ]);
        break;
      case 'with-avatar-and-cover':
        setColumnVisibility([
          ...columnVisibility.filter((c) => ['avatar', 'cover'].includes(c)),
        ]);
        break;
      default:
        setColumnVisibility([...columnVisibility, 'avatar', 'cover']);
        break;
    }
  };

  const getValue = () => {
    if (coverField && !coverField.hide) {
      if (avatarField && !avatarField.hide) {
        return 'with-avatar-and-cover';
      }
      return 'with-cover';
    }

    if (avatarField && !avatarField.hide) {
      return 'with-avatar';
    }

    return 'basic';
  };

  return (
    <Select
      name="cardType"
      value={getValue()}
      options={options}
      onChange={handleChange}
      label={
        <FormattedMessage
          defaultMessage="Card appearance"
          id="uidu.data-views.gallery.controls.card_appearance"
        />
      }
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      components={{
        DropdownIndicator: () => null,
      }}
    />
  );
}
