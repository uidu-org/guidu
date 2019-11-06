import { Field } from '@uidu/data-fields';
import numeral from 'numeral';
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
import { Column } from '../types';

const getColumnType = (field: Field) => {
  switch (field.kind) {
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
      return dateColumn({});
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
    case 'singleSelect':
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

export const buildColumn = (column: Column) => ({
  headerName: column.headerName,
  ...getColumnType(column.dataField),
});

export const buildColumns = (columns: Array<Column>) =>
  columns.map(column => buildColumn(column));

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

export const numericComparator = (number1, number2) => {
  const numericNumber1 = numeral(number1).value();
  const numericNumber2 = numeral(number2).value();
  if (numericNumber1 === null && number2 === null) {
    return 0;
  }

  if (isNaN(numericNumber1)) {
    return -1;
  }

  if (isNaN(numericNumber2)) {
    return 1;
  }

  if (numericNumber1 === null) {
    return -1;
  }

  if (numericNumber2 === null) {
    return 1;
  }

  return numericNumber1 - numericNumber2;
};
