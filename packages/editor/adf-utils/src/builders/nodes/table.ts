import { TableDefinition, TableRowDefinition } from '@uidu/adf-schema';

export const table = (
  ...content: Array<TableRowDefinition>
): TableDefinition => ({
  type: 'table',
  content,
});
