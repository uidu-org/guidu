import { TableMap } from 'prosemirror-tables';
import { Node as PMNode } from 'prosemirror-model';
import { isTableSelected } from 'prosemirror-utils';
import { tableCellMinWidth } from '@atlaskit/editor-common';
import { Command, DomAtPos } from '../../../../types';
import { updateColumnWidths } from '../../transforms';
import { createCommand, getPluginState } from './plugin';
import {
  addContainerLeftRightPadding,
  resizeColumn,
  getResizeStateFromDOM,
  hasTableBeenResized,
  insertColgroupFromNode as recreateResizeColsByNode,
  ScaleOptions,
  scaleWithParent,
  scale,
  ResizeState,
  isClickNear,
  evenAllColumnsWidths,
} from './utils';
import { Transaction } from 'prosemirror-state';

export const handleBreakoutContent = (
  tableRef: HTMLTableElement,
  cellPos: number,
  start: number,
  minWidth: number,
  table: PMNode,
  domAtPos: DomAtPos,
): Command => (state, dispatch) => {
  const map = TableMap.get(table);
  // Investigate Math.max fallback for tests using JSDOM: https://product-fabric.atlassian.net/browse/ED-7000
  const rect = map.findCell(Math.max(cellPos - start, 1));
  const cellStyle = getComputedStyle(tableRef);
  const amount = addContainerLeftRightPadding(
    minWidth - tableRef.offsetWidth,
    cellStyle,
  );

  while (tableRef.nodeName !== 'TABLE') {
    tableRef = tableRef.parentNode as HTMLTableElement;
  }

  const resizeState = resizeColumn(
    getResizeStateFromDOM({
      minWidth: tableCellMinWidth,
      maxSize: tableRef.offsetWidth,
      table,
      tableRef,
      start,
      domAtPos,
    }),
    rect.left,
    amount,
  );

  const { tr } = state;
  updateColumnWidths(resizeState, table, start)(tr);

  if (dispatch && tr.docChanged) {
    dispatch(tr);
  }

  return true;
};

// Scale the table to meet new requirements (col, layout change etc)
export const scaleTable = (
  tableRef: HTMLTableElement | null | undefined,
  options: ScaleOptions,
  domAtPos: DomAtPos,
): Command => (state, dispatch) => {
  if (!tableRef) {
    return false;
  }

  const { node, start, parentWidth } = options;

  // If a table has not been resized yet, columns should be auto.
  if (hasTableBeenResized(node) === false) {
    // If its not a re-sized table, we still want to re-create cols
    // To force reflow of columns upon delete.
    recreateResizeColsByNode(tableRef, node);
    return false;
  }

  let resizeState;
  if (parentWidth) {
    resizeState = scaleWithParent(tableRef, parentWidth, node, start, domAtPos);
  } else {
    resizeState = scale(tableRef, options, domAtPos);
  }

  if (resizeState) {
    let { tr } = state;
    tr = updateColumnWidths(resizeState, node, start)(tr);

    if (tr.docChanged && dispatch) {
      dispatch(tr);
      return true;
    }
  }

  return false;
};

export const evenColumns = ({
  resizeState,
  table,
  start,
  event,
}: {
  resizeState: ResizeState;
  table: PMNode;
  start: number;
  event: MouseEvent;
}): Command => (state, dispatch) => {
  if (!isTableSelected(state.selection)) {
    return false;
  }

  // double click detection logic
  // Note: ProseMirror's handleDoubleClick doesn't quite work with DOM mousedown event handler
  const { lastClick } = getPluginState(state);
  const now = Date.now();
  if (
    lastClick &&
    now - lastClick.time < 500 &&
    isClickNear(event, lastClick)
  ) {
    const newState = evenAllColumnsWidths(resizeState);
    setLastClick(null, tr => updateColumnWidths(newState, table, start)(tr))(
      state,
      dispatch,
    );

    return true;
  }

  setLastClick({ x: event.clientX, y: event.clientY, time: now })(
    state,
    dispatch,
  );

  return false;
};

export const setResizeHandlePos = (resizeHandlePos: number | null) =>
  createCommand({
    type: 'SET_RESIZE_HANDLE_POSITION',
    data: {
      resizeHandlePos,
    },
  });

export const setDragging = (
  dragging: { startX: number; startWidth: number } | null,
  tr?: Transaction,
) =>
  createCommand(
    {
      type: 'SET_DRAGGING',
      data: {
        dragging,
      },
    },
    originalTr => tr || originalTr,
  );

export const setLastClick = (
  lastClick: { x: number; y: number; time: number } | null,
  transform?: (tr: Transaction) => Transaction,
) =>
  createCommand(
    {
      type: 'SET_LAST_CLICK',
      data: {
        lastClick,
      },
    },
    transform,
  );
