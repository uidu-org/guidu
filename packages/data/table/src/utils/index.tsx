import { byName, Field } from '@uidu/data-fields';
import numeral from 'numeral';
import React from 'react';
import {
  addFieldColumn,
  addressColumn,
  attachmentsColumn,
  avatarColumn,
  checkboxColumn,
  contactColumn,
  countryColumn,
  coverColumn,
  currencyColumn,
  dateColumn,
  emailColumn,
  linkRecordColumn,
  memberColumn,
  multipleSelectColumn,
  numberColumn,
  paymentMethodColumn,
  percentColumn,
  phoneColumn,
  primaryColumn,
  progressColumn,
  ratingColumn,
  singleSelectColumn,
  stringColumn,
  textColumn,
  uidColumn,
  urlColumn,
  voteColumn,
} from '../components/columns';
import { Column } from '../types';

const getColumnType = (dataField: Field['kind'], dataFieldParams: any = {}) => {
  switch (dataField) {
    case 'addField':
      return addFieldColumn(dataFieldParams);
    case 'address':
      return addressColumn();
    case 'attachments':
      return attachmentsColumn();
    case 'avatar':
      return avatarColumn();
    case 'checkbox':
      return checkboxColumn();
    case 'contact':
      return contactColumn(dataFieldParams);
    case 'country':
      return countryColumn(dataFieldParams);
    case 'cover':
      return coverColumn();
    case 'currency':
      return currencyColumn();
    case 'date':
      return dateColumn(dataFieldParams);
    case 'email':
      return emailColumn();
    case 'linkRecord':
      return linkRecordColumn();
    case 'member':
      return memberColumn(dataFieldParams);
    case 'multipleSelect':
      return multipleSelectColumn(dataFieldParams);
    case 'number':
      return numberColumn();
    case 'paymentMethod':
      return paymentMethodColumn(dataFieldParams);
    case 'percent':
      return percentColumn();
    case 'phone':
      return phoneColumn();
    case 'progress':
      return progressColumn();
    case 'rating':
      return ratingColumn();
    case 'singleSelect':
      return singleSelectColumn(dataFieldParams);
    case 'string':
      return stringColumn();
    case 'text':
      return textColumn();
    case 'uid':
      return uidColumn();
    case 'url':
      return urlColumn();
    case 'vote':
      return voteColumn();
    default:
      return {};
  }
};

export const buildColumn = ({
  primary,
  dataField,
  dataFieldParams,
  ...column
}: Column) => {
  return {
    ...(dataField
      ? { ...getColumnType(dataField, { ...dataFieldParams, ...column }) }
      : {}),
    ...(primary ? { ...primaryColumn() } : {}),
    ...column,
  };
};

export const buildColumns = (columns): Array<Column> =>
  columns.map(column => buildColumn(column));

export const valueRenderer = (data, column) => {
  const {
    field,
    cellRenderer: Renderer,
    cellRendererParams,
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

  if (Renderer) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: Renderer({ value, data, ...cellRendererParams }),
        }}
      />
    );
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
  columnDefs.filter(column => column.viewType === 'primary')[0];

export const getCover = columnDefs =>
  columnDefs.filter(column => column.viewType === 'cover')[0];

export const getAvatar = columnDefs =>
  columnDefs.filter(column => column.viewType === 'avatar')[0];

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

export const getColumnDef = (columnDefs, filterOrGrouperOrSorter) =>
  columnDefs.filter(c => c.colId === filterOrGrouperOrSorter.colId)[0];

export const getFieldFromColumnDef = columnDef => byName[columnDef.viewType];
