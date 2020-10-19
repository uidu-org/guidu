import numeral from 'numeral';
import {
  addField,
  addressField,
  attachmentsField,
  avatarField,
  byName,
  checkboxField,
  contactField,
  countryField,
  coverField,
  currencyField,
  dateField,
  emailField,
  Field,
  linkRecordField,
  memberField,
  multipleSelectField,
  numberField,
  paymentMethodField,
  percentField,
  phoneField,
  progressField,
  ratingField,
  singleSelectField,
  stringField,
  textField,
  uidField,
  urlField,
  voteField,
} from '..';
import { ColumnGroup } from '../types';

const getColumnType = (kind: Field['kind'], dataFieldParams: any = {}) => {
  switch (kind) {
    case 'addField':
      return { ...addField };
    case 'address':
      return { ...addressField };
    case 'attachments':
      return { ...attachmentsField };
    case 'avatar':
      return { ...avatarField };
    case 'checkbox':
      return { ...checkboxField };
    case 'contact':
      return { ...contactField };
    case 'country':
      return { ...countryField };
    case 'cover':
      return { ...coverField };
    case 'currency':
      return { ...currencyField };
    case 'date':
      return { ...dateField };
    case 'email':
      return { ...emailField };
    case 'linkRecord':
      return { ...linkRecordField };
    case 'member':
      return { ...memberField };
    case 'multipleSelect':
      return { ...multipleSelectField };
    case 'number':
      return { ...numberField };
    case 'paymentMethod':
      return { ...paymentMethodField };
    case 'percent':
      return { ...percentField };
    case 'phone':
      return { ...phoneField };
    case 'progress':
      return { ...progressField };
    case 'rating':
      return { ...ratingField };
    case 'singleSelect':
      return { ...singleSelectField };
    case 'string':
      return { ...stringField };
    case 'text':
      return { ...textField };
    case 'uid':
      return { ...uidField };
    case 'url':
      return { ...urlField };
    case 'vote':
      return { ...voteField };
    default:
      return {};
  }
};

export const buildColumn = ({ columns, ...fieldGroup }: ColumnGroup) => {
  return columns.map(({ primary, kind, dataFieldParams, ...column }) => {
    return {
      fieldGroup,
      id: column.id,
      accessor: column.id,
      ...(kind
        ? { ...getColumnType(kind, { ...dataFieldParams, ...column }) }
        : {}),
      ...(primary
        ? {
            canMove: false,
            canHide: false,
            lockPinned: true,
            isPrimary: true,
            showRowGroup: true,
            pinned: 'left',
          }
        : {}),
      ...column,
    };
  });
};

export const buildColumns = (columns): Array<ColumnGroup> => {
  return columns.reduce((arr, item) => {
    return [...arr, ...buildColumn(item)];
  }, []);
};

export const getPrimary = (columnDefs) =>
  columnDefs.filter((column) => column.isPrimary)[0];

export const getCover = (columnDefs) =>
  columnDefs.filter((column) => column.kind === 'cover')[0];

export const getAvatar = (columnDefs) =>
  columnDefs.filter((column) => column.kind === 'avatar')[0];

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
  columnDefs.filter((c) => c.id === filterOrGrouperOrSorter.id)[0];

export const getFieldFromColumnDef = (columnDef) => byName[columnDef.kind];
