// #region Imports
import { Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import {
  findTable,
  addColumnAt,
  addRowAt,
  safeInsert,
  createTable as createTableNode,
} from 'prosemirror-utils';
import { getPluginState } from '../pm-plugins/main';
import { checkIfHeaderRowEnabled } from '../utils';
import { Command } from '../../../types';
// #endregion

// #region Commands
export const insertColumn = (column: number): Command => (state, dispatch) => {
  const tr = addColumnAt(column)(state.tr);
  const table = findTable(tr.selection)!;
  // move the cursor to the newly created column
  const pos = TableMap.get(table.node).positionAt(0, column, table.node);
  if (dispatch) {
    dispatch(
      tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))),
    );
  }
  return true;
};

export const insertRow = (row: number): Command => (state, dispatch) => {
  // Don't clone the header row
  const headerRowEnabled = checkIfHeaderRowEnabled(state);
  const clonePreviousRow =
    (headerRowEnabled && row > 1) || (!headerRowEnabled && row >= 0);

  const tr = addRowAt(row, clonePreviousRow)(state.tr);

  const table = findTable(tr.selection)!;
  // move the cursor to the newly created row
  const pos = TableMap.get(table.node).positionAt(row, 0, table.node);

  if (dispatch) {
    dispatch(
      tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))),
    );
  }
  return true;
};

export const createTable: Command = (state, dispatch) => {
  if (!getPluginState(state)) {
    return false;
  }
  const table = createTableNode(state.schema);

  if (dispatch) {
    dispatch(safeInsert(table)(state.tr).scrollIntoView());
  }
  return true;
};
// #endregion
