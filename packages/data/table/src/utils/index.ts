import { dateColumn, numberColumn, singleSelectColumn } from '../components/columns';

const getColumnType = field => {
  switch (field.type) {
    case 'date':
      return dateColumn();
    case 'number':
      return numberColumn();
    case 'single_select':
      return singleSelectColumn(field);
    default:
      return {};
  }
}

export const buildColumn = field => ({
  colId: field.name,
  field: field.name,
  headerName: field.label,
  ...getColumnType(field),
})
