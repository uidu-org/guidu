import { defineMessages } from 'react-intl';

export default defineMessages({
  insertColumn: {
    id: 'uidu.editor-core.insertColumn',
    defaultMessage: 'Insert column',
    description: 'Add a new column to your table.',
  },
  removeColumns: {
    id: 'uidu.editor-core.removeColumns',
    defaultMessage: 'Remove {0, plural, one {column} other {columns}}',
    description: 'Deletes a table column.',
  },
  insertRow: {
    id: 'uidu.editor-core.insertRow',
    defaultMessage: 'Insert row',
    description: 'Add a new row to your table.',
  },
  removeRows: {
    id: 'uidu.editor-core.removeRows',
    defaultMessage: 'Remove {0, plural, one {row} other {rows}}',
    description: 'Deletes a table row.',
  },
  cellOptions: {
    id: 'uidu.editor-core.cellOptions',
    defaultMessage: 'Cell options',
    description: 'Opens a menu with options for the current table cell.',
  },
});
