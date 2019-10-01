import {
  TableRowDefinition,
  TableHeaderDefinition,
  TableCellDefinition,
} from '@uidu/adf-schema';

export const tableRow = (
  content: Array<TableHeaderDefinition> | Array<TableCellDefinition>,
): TableRowDefinition => ({
  type: 'tableRow',
  content,
});
