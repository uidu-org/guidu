import { TableCellDefinition, CellAttributes } from '@uidu/adf-schema';

export const tableCell = (attrs?: CellAttributes) => (
  ...content: TableCellDefinition['content']
): TableCellDefinition => ({
  type: 'tableCell',
  attrs,
  content,
});
