// #region Imports
import { CellAttributes } from '@uidu/adf-schema';
import { Node as PMNode, Schema, Slice } from 'prosemirror-model';
import { Selection, TextSelection, Transaction } from 'prosemirror-state';
import {
  CellSelection,
  goToNextCell as baseGotoNextCell,
  selectionCell,
  splitCellWithType,
  TableMap,
} from 'prosemirror-tables';
import {
  ContentNodeWithPos,
  findCellClosestToPos,
  findParentNodeOfType,
  findTable,
  getCellsInColumn,
  getCellsInRow,
  getSelectionRect,
  isCellSelection,
  removeTable,
  selectColumn as selectColumnTransform,
  selectRow as selectRowTransform,
  setCellAttrs,
} from 'prosemirror-utils';
import { DecorationSet, EditorView } from 'prosemirror-view';
import { analyticsService } from '../../../analytics';
import { Command } from '../../../types';
import {
  closestElement,
  isNodeTypeParagraph,
  isTextSelection,
} from '../../../utils';
import { mapSlice } from '../../../utils/slice';
import { INPUT_METHOD } from '../../analytics';
import { outdentList } from '../../lists/commands';
import { insertRowWithAnalytics } from '../commands-with-analytics';
import { createCommand, getPluginState } from '../pm-plugins/main';
import { fixAutoSizedTable } from '../transforms';
import {
  TableCssClassName as ClassName,
  TableDecorations,
  TablePluginState,
} from '../types';
import {
  checkIfHeaderColumnEnabled,
  checkIfHeaderRowEnabled,
  createColumnControlsDecoration,
  isIsolating,
  updatePluginStateDecorations,
} from '../utils';
// #endregion

// #region Constants
const TAB_FORWARD_DIRECTION = 1;
const TAB_BACKWARD_DIRECTION = -1;
// #endregion

// #region Commands
export const setEditorFocus = (editorHasFocus: boolean) =>
  createCommand({
    type: 'SET_EDITOR_FOCUS',
    data: {
      editorHasFocus,
    },
  });

export const setTableRef = (ref?: HTMLElement | null) =>
  createCommand(
    state => {
      const tableRef = ref || undefined;
      const tableNode = ref ? findTable(state.selection)!.node : undefined;
      const tableWrapperTarget =
        closestElement(tableRef, `.${ClassName.TABLE_NODE_WRAPPER}`) ||
        undefined;
      const layout = tableNode ? tableNode.attrs.layout : undefined;
      const {
        pluginConfig: { allowControls = true },
      } = getPluginState(state);

      let decorationSet = DecorationSet.empty;

      if (allowControls && tableRef) {
        decorationSet = updatePluginStateDecorations(
          state,
          createColumnControlsDecoration(state.selection),
          TableDecorations.COLUMN_CONTROLS_DECORATIONS,
        );
      }

      return {
        type: 'SET_TABLE_REF',
        data: {
          tableRef,
          tableNode,
          tableWrapperTarget,
          layout: layout || 'default',
          isHeaderRowEnabled: checkIfHeaderRowEnabled(state),
          isHeaderColumnEnabled: checkIfHeaderColumnEnabled(state),
          decorationSet,
        },
      };
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const setCellAttr = (name: string, value: any): Command => (
  state,
  dispatch,
) => {
  const { tr, selection } = state;
  if (selection instanceof CellSelection) {
    let updated = false;
    selection.forEachCell((cell, pos) => {
      if (cell.attrs[name] !== value) {
        tr.setNodeMarkup(pos, cell.type, { ...cell.attrs, [name]: value });
        updated = true;
      }
    });
    if (updated) {
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
  } else {
    const cell: any = selectionCell(state);
    if (cell) {
      if (dispatch) {
        dispatch(
          tr.setNodeMarkup(cell.pos, cell.nodeAfter.type, {
            ...cell.nodeAfter.attrs,
            [name]: value,
          }),
        );
      }
      return true;
    }
  }
  return false;
};

export const triggerUnlessTableHeader = (command: Command): Command => (
  state,
  dispatch,
) => {
  const {
    selection,
    schema: {
      nodes: { tableHeader },
    },
  } = state;

  if (selection instanceof TextSelection) {
    const cell = findCellClosestToPos(selection.$from);
    if (cell && cell.node.type !== tableHeader) {
      return command(state, dispatch);
    }
  }

  if (selection instanceof CellSelection) {
    const rect = getSelectionRect(selection);
    if (!checkIfHeaderRowEnabled(state) || (rect && rect.top > 0)) {
      return command(state, dispatch);
    }
  }

  return false;
};

export const transformSliceRemoveCellBackgroundColor = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { tableCell, tableHeader } = schema.nodes;
  return mapSlice(slice, maybeCell => {
    if (maybeCell.type === tableCell || maybeCell.type === tableHeader) {
      const cellAttrs: CellAttributes = { ...maybeCell.attrs };
      cellAttrs.background = undefined;
      return maybeCell.type.createChecked(
        cellAttrs,
        maybeCell.content,
        maybeCell.marks,
      );
    }
    return maybeCell;
  });
};

export const transformSliceToAddTableHeaders = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { table, tableHeader, tableRow } = schema.nodes;

  return mapSlice(slice, maybeTable => {
    if (maybeTable.type === table) {
      const firstRow = maybeTable.firstChild;
      if (firstRow) {
        const headerCols = [] as PMNode[];
        firstRow.forEach(oldCol => {
          headerCols.push(
            tableHeader.createChecked(
              oldCol.attrs,
              oldCol.content,
              oldCol.marks,
            ),
          );
        });
        const headerRow = tableRow.createChecked(
          firstRow.attrs,
          headerCols,
          firstRow.marks,
        );
        return maybeTable.copy(maybeTable.content.replaceChild(0, headerRow));
      }
    }
    return maybeTable;
  });
};

export const transformSliceToRemoveColumnsWidths = (
  slice: Slice,
  schema: Schema,
): Slice => {
  const { tableHeader, tableCell } = schema.nodes;

  return mapSlice(slice, maybeCell => {
    if (maybeCell.type === tableCell || maybeCell.type === tableHeader) {
      if (!maybeCell.attrs.colwidth) {
        return maybeCell;
      }
      return maybeCell.type.createChecked(
        { ...maybeCell.attrs, colwidth: undefined },
        maybeCell.content,
        maybeCell.marks,
      );
    }
    return maybeCell;
  });
};

export const deleteTable: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeTable(state.tr));
  }
  return true;
};

export const convertFirstRowToHeader = (schema: Schema) => (
  tr: Transaction,
): Transaction => {
  const table = findTable(tr.selection)!;
  const map = TableMap.get(table.node);
  for (let i = 0; i < map.width; i++) {
    const cell = table.node.child(0).child(i);
    tr.setNodeMarkup(
      table.start + map.map[i],
      schema.nodes.tableHeader,
      cell.attrs,
    );
  }
  return tr;
};

export const goToNextCell = (direction: number): Command => (
  state,
  dispatch,
) => {
  const table = findTable(state.selection);
  if (!table) {
    return false;
  }
  const map = TableMap.get(table.node);
  const { tableCell, tableHeader } = state.schema.nodes;
  const cell = findParentNodeOfType([tableCell, tableHeader])(state.selection)!;
  const firstCellPos = map.positionAt(0, 0, table.node) + table.start;
  const lastCellPos =
    map.positionAt(map.height - 1, map.width - 1, table.node) + table.start;

  if (firstCellPos === cell.pos && direction === TAB_BACKWARD_DIRECTION) {
    insertRowWithAnalytics(INPUT_METHOD.KEYBOARD, 0)(state, dispatch);
    return true;
  }

  if (lastCellPos === cell.pos && direction === TAB_FORWARD_DIRECTION) {
    insertRowWithAnalytics(INPUT_METHOD.KEYBOARD, map.height)(state, dispatch);
    return true;
  }

  const event =
    direction === TAB_FORWARD_DIRECTION ? 'next_cell' : 'previous_cell';
  analyticsService.trackEvent(
    `atlassian.editor.format.table.${event}.keyboard`,
  );

  return baseGotoNextCell(direction)(state, dispatch);
};

export const moveCursorBackward: Command = (state, dispatch) => {
  const { $cursor } = state.selection as TextSelection;
  // if cursor is in the middle of a text node, do nothing
  if (!$cursor || $cursor.parentOffset > 0) {
    return false;
  }

  // find the node before the cursor
  let before;
  let cut: number | undefined;
  if (!isIsolating($cursor.parent)) {
    for (let i = $cursor.depth - 1; !before && i >= 0; i--) {
      if ($cursor.index(i) > 0) {
        cut = $cursor.before(i + 1);
        before = $cursor.node(i).child($cursor.index(i) - 1);
      }
      if (isIsolating($cursor.node(i))) {
        break;
      }
    }
  }

  // if the node before is not a table node - do nothing
  if (!before || before.type !== state.schema.nodes.table) {
    return false;
  }

  /*
    ensure we're just at a top level paragraph
    otherwise, perform regular backspace behaviour
   */
  const grandparent = $cursor.node($cursor.depth - 1);
  const { listItem } = state.schema.nodes;

  if (
    $cursor.parent.type !== state.schema.nodes.paragraph ||
    (grandparent && grandparent.type !== state.schema.nodes.doc)
  ) {
    if (grandparent && grandparent.type === listItem) {
      return outdentList()(state, dispatch);
    } else {
      return false;
    }
  }

  const { tr } = state;
  const lastCellPos = (cut || 0) - 4;
  // need to move cursor inside the table to be able to calculate table's offset
  tr.setSelection(new TextSelection(state.doc.resolve(lastCellPos)));
  const { $from } = tr.selection;
  const start = $from.start(-1);
  const pos = start + $from.parent.nodeSize - 1;
  // move cursor to the last cell
  // it doesn't join node before (last cell) with node after (content after the cursor)
  // due to ridiculous amount of PM code that would have been required to overwrite
  if (dispatch) {
    dispatch(tr.setSelection(new TextSelection(state.doc.resolve(pos))));
  }

  return true;
};

export const setMultipleCellAttrs = (
  attrs: Object,
  targetCellPosition?: number,
): Command => (state, dispatch) => {
  let cursorPos: number | undefined;
  let { tr } = state;

  if (isCellSelection(tr.selection)) {
    const selection = (tr.selection as any) as CellSelection;
    selection.forEachCell((_cell, pos) => {
      const $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
      tr = setCellAttrs(findCellClosestToPos($pos)!, attrs)(tr);
    });
    cursorPos = selection.$headCell.pos;
  } else if (targetCellPosition) {
    const cell = findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1))!;
    tr = setCellAttrs(cell, attrs)(tr);
    cursorPos = cell.pos;
  }

  if (tr.docChanged && cursorPos !== undefined) {
    const $pos = tr.doc.resolve(tr.mapping.map(cursorPos!));

    if (dispatch) {
      dispatch(tr.setSelection(Selection.near($pos)));
    }
    return true;
  }
  return false;
};

export const selectColumn = (column: number, expand?: boolean) =>
  createCommand(
    state => {
      let targetCellPosition;
      const cells = getCellsInColumn(column)(state.tr.selection);
      if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
      }

      return { type: 'SET_TARGET_CELL_POSITION', data: { targetCellPosition } };
    },
    tr =>
      selectColumnTransform(column, expand)(tr).setMeta('addToHistory', false),
  );

export const selectRow = (row: number, expand?: boolean) =>
  createCommand(
    state => {
      let targetCellPosition;
      const cells = getCellsInRow(row)(state.tr.selection);
      if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
      }

      return { type: 'SET_TARGET_CELL_POSITION', data: { targetCellPosition } };
    },
    tr => selectRowTransform(row, expand)(tr).setMeta('addToHistory', false),
  );

export const showInsertColumnButton = (columnIndex: number) =>
  createCommand(
    _ =>
      columnIndex > -1
        ? {
            type: 'SHOW_INSERT_COLUMN_BUTTON',
            data: { insertColumnButtonIndex: columnIndex },
          }
        : false,
    tr => tr.setMeta('addToHistory', false),
  );

export const showInsertRowButton = (rowIndex: number) =>
  createCommand(
    _ =>
      rowIndex > -1
        ? {
            type: 'SHOW_INSERT_ROW_BUTTON',
            data: { insertRowButtonIndex: rowIndex },
          }
        : false,
    tr => tr.setMeta('addToHistory', false),
  );

export const hideInsertColumnOrRowButton = () =>
  createCommand(
    {
      type: 'HIDE_INSERT_COLUMN_OR_ROW_BUTTON',
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const autoSizeTable = (
  view: EditorView,
  node: PMNode,
  table: HTMLTableElement,
  basePos: number,
  opts: { dynamicTextSizing: boolean; containerWidth: number },
) => {
  view.dispatch(fixAutoSizedTable(view, node, table, basePos, opts));
  return true;
};

export const addBoldInEmptyHeaderCells = (
  tableCellHeader: ContentNodeWithPos,
): Command => (state, dispatch): boolean => {
  const { tr } = state;
  if (
    // Avoid infinite loop when the current selection is not a TextSelection
    isTextSelection(tr.selection) &&
    // When storedMark is null that means this is the initial state
    // if the user press to remove the mark storedMark will be an empty array
    // and we shouldn't apply the strong mark
    tr.storedMarks == null &&
    // Check if the current node is a direct child from paragraph
    tr.selection.$from.depth === tableCellHeader.depth + 1 &&
    // this logic is applied only for empty paragraph
    tableCellHeader.node.nodeSize === 4 &&
    isNodeTypeParagraph(tableCellHeader.node.firstChild)
  ) {
    const { strong } = state.schema.marks;
    tr.setStoredMarks([strong.create()]).setMeta('addToHistory', false);

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  }

  return false;
};
// #endregion

/**
 * We need to split cell keeping the right type of cell given current table configuration.
 * We are using prosemirror-tables splitCellWithType that allows you to choose what cell type should be.
 */
export const splitCell: Command = (state, dispatch) => {
  const tableState: TablePluginState = getPluginState(state);
  const { tableHeader, tableCell } = state.schema.nodes;
  return splitCellWithType(({ row, col }: { row: number; col: number }) => {
    if (
      (row === 0 && tableState.isHeaderRowEnabled) ||
      (col === 0 && tableState.isHeaderColumnEnabled)
    ) {
      return tableHeader;
    }

    return tableCell;
  })(state, dispatch);
};
