import React from 'react';
import {
  addressColumn,
  attachmentsColumn,
  checkboxColumn,
  countryColumn,
  currencyColumn,
  dateColumn,
  emailColumn,
  memberColumn,
  multipleSelectColumn,
  numberColumn,
  percentColumn,
  phoneColumn,
  progressColumn,
  ratingColumn,
  singleSelectColumn,
  stringColumn,
  textColumn,
  urlColumn,
  voteColumn,
} from '../components/columns';

const getColumnType = field => {
  switch (field.type) {
    case 'address':
      return addressColumn();
    case 'attachments':
      return attachmentsColumn();
    case 'checkbox':
      return checkboxColumn();
    case 'country':
      return countryColumn();
    case 'currency':
      return currencyColumn();
    case 'date':
      return dateColumn();
    case 'email':
      return emailColumn();
    case 'member':
      return memberColumn(field);
    case 'multipleSelect':
      return multipleSelectColumn(field);
    case 'number':
      return numberColumn();
    case 'percent':
      return percentColumn();
    case 'phone':
      return phoneColumn();
    case 'progress':
      return progressColumn();
    case 'rating':
      return ratingColumn();
    case 'single_select':
      return singleSelectColumn(field);
    case 'string':
      return stringColumn();
    case 'text':
      return textColumn();
    case 'url':
      return urlColumn();
    case 'vote':
      return voteColumn();
    default:
      return {};
  }
};

export const buildColumn = field => ({
  colId: field.name,
  field: field.name,
  headerName: field.label,
  ...getColumnType(field),
});

export const buildColumns = fields => fields.map(field => buildColumn(field));

export const valueRenderer = (data, column) => {
  const {
    field,
    cellRenderer: Renderer,
    cellRendererFramework: RendererFramework,
    valueFormatter,
    valueGetter,
  } = column;
  let value = data[field];

  if (valueGetter) {
    value = valueGetter({ data, value });
  }

  if (!value) {
    return '-';
  }

  if (RendererFramework) {
    return (
      <RendererFramework
        data={data}
        value={valueFormatter ? valueFormatter({ value }) : value}
        colDef={column}
      />
    );
  }
  return valueFormatter ? valueFormatter({ value }) : value;
};

export const getPrimary = columnDefs =>
  columnDefs.filter(column => column.type === 'primary')[0];

export const getCover = columnDefs =>
  columnDefs.filter(column => column.type === 'cover')[0];

export const getAvatar = columnDefs =>
  columnDefs.filter(column => column.type === 'avatar')[0];
