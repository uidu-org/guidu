import { CellAttributes, TableCellDefinition } from '@uidu/adf-schema';

export const tableCell = (attrs?: CellAttributes) => (
  ...content: TableCellDefinition['content']
): TableCellDefinition => ({
  type: 'tableCell',
  attrs,
  content,
});
