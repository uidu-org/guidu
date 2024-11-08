import { Transaction } from 'prosemirror-state';
import { pluginKey } from '../pm-plugins/plugin-factory';

// Set metadata on a ProseMirror transaction for debugging purposes in Synchrony
type TableProblems =
  | 'NEGATIVE_ROWSPAN'
  | 'REMOVE_EMPTY_ROWS'
  | 'REMOVE_EMPTY_COLUMNS'
  | 'EMPTY_TABLE'
  | 'FIX_ROWSPANS'
  | 'COLWIDTHS_BEFORE_UPDATE'
  | 'COLWIDTHS_AFTER_UPDATE';

export type TableMetaData =
  | { type: 'MERGE_CELLS'; problem?: TableProblems }
  | { type: 'DELETE_ROWS'; problem?: TableProblems }
  | { type: 'DELETE_COLUMNS'; problem?: TableProblems }
  | {
      type: 'UPDATE_COLUMN_WIDTHS';
      data: { colwidths: number[]; colspan: number };
      problem?: TableProblems;
    };

export const setMeta =
  (meta: TableMetaData) =>
  (tr: Transaction): Transaction => {
    return tr.setMeta(pluginKey, meta);
  };
