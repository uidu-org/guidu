import { CellAttributes, TableHeaderDefinition } from '@uidu/adf-schema';

export const tableHeader = (attrs?: CellAttributes) => (
  ...content: TableHeaderDefinition['content']
): TableHeaderDefinition => ({
  type: 'tableHeader',
  attrs,
  content: content,
});
