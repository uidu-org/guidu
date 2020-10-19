import Select from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function CardTypes({ columnDefs, tableInstance }) {
  const { state, setHiddenColumns } = tableInstance;
  console.log(state);

  const options = [{ id: 'basic', name: 'Basic' }];
  const coverField = columnDefs.filter((column) => column.kind === 'cover')[0];
  const avatarField = columnDefs.filter(
    (column) => column.kind === 'avatar',
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
        setHiddenColumns([
          ...state.hiddenColumns.filter((c) => c !== 'avatar'),
          'cover',
        ]);
        // gridColumnApi.setColumnsVisible(['cover'], false);
        // gridColumnApi.setColumnsVisible(['avatar'], true);
        break;
      case 'with-cover':
        setHiddenColumns([
          ...state.hiddenColumns.filter((c) => c !== 'cover'),
          'avatar',
        ]);
        // gridColumnApi.setColumnsVisible(['avatar'], false);
        // gridColumnApi.setColumnsVisible(['cover'], true);
        break;
      case 'with-avatar-and-cover':
        setHiddenColumns([
          ...state.hiddenColumns.filter((c) => ['avatar', 'cover'].includes(c)),
        ]);
        // gridColumnApi.setColumnsVisible(['avatar', 'cover'], true);
        break;
      default:
        setHiddenColumns([...state.hiddenColumns, 'avatar', 'cover']);
        // gridColumnApi.setColumnsVisible(['cover', 'avatar'], false);
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
          id="data_views.gallery.configurator.cardAppearance"
        />
      }
      rowClassName="mb-0"
    />
  );
}
