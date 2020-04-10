import {
  TableCellDefinition,
  TableHeaderDefinition,
  TableRowDefinition,
} from '@uidu/adf-schema';

export const tableRow = (
  content: Array<TableHeaderDefinition> | Array<TableCellDefinition>,
): TableRowDefinition => ({
  type: 'tableRow',
  content,
});
