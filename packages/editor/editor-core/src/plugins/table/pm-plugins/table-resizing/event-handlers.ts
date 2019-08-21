import { CellAttributes, TableLayout } from '@atlaskit/adf-schema';
import {
  akEditorTableNumberColumnWidth,
  tableCellMinWidth,
} from '@uidu/editor-common';
import { TableMap } from 'prosemirror-tables';
import { getSelectionRect } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { getParentNodeWidth } from '../../../../utils/node-width';
import { pluginKey as editorDisabledPluginKey } from '../../../editor-disabled';
import { pluginKey as widthPluginKey } from '../../../width';
import { updateColumnWidths } from '../../transforms';
import { getSelectedColumnIndexes } from '../../utils';
import { evenColumns, setDragging } from './commands';
import { getPluginState } from './plugin';
import {
  createResizeHandle,
  currentColWidth,
  getLayoutSize,
  getResizeStateFromDOM,
  pointsAtCell,
  resizeColumn,
  updateControls,
  updateResizeHandle,
} from './utils';

export const handleMouseDown = (
  view: EditorView,
  event: MouseEvent,
  resizeHandlePos: number,
  dynamicTextSizing: boolean,
) => {
  const { state, dispatch } = view;
  const { editorDisabled } = editorDisabledPluginKey.getState(state);
  const domAtPos = view.domAtPos.bind(view);

  if (
    editorDisabled ||
    resizeHandlePos === null ||
    !pointsAtCell(state.doc.resolve(resizeHandlePos))
  ) {
    return false;
  }
  event.preventDefault();
  const cell = state.doc.nodeAt(resizeHandlePos);
  const $cell = state.doc.resolve(resizeHandlePos);
  const originalTable = $cell.node(-1);
  const start = $cell.start(-1);

  let dom: HTMLTableElement = domAtPos(start).node as HTMLTableElement;
  while (dom.nodeName !== 'TABLE') {
    dom = dom.parentNode! as HTMLTableElement;
  }

  let resizeHandleRef: HTMLDivElement | null = createResizeHandle(
    dom as HTMLTableElement,
  );

  const containerWidth = widthPluginKey.getState(state);
  const parentWidth = getParentNodeWidth(start, state, containerWidth);

  let maxSize =
    parentWidth ||
    getLayoutSize(
      dom.getAttribute('data-layout') as TableLayout,
      containerWidth.width,
      {
        dynamicTextSizing,
      },
    );

  if (originalTable.attrs.isNumberColumnEnabled) {
    maxSize -= akEditorTableNumberColumnWidth;
  }

  const resizeState = getResizeStateFromDOM({
    minWidth: tableCellMinWidth,
    maxSize,
    table: originalTable,
    tableRef: dom,
    start,
    domAtPos,
  });

  if (
    evenColumns({
      resizeState,
      table: originalTable,
      start,
      event,
    })(state, dispatch)
  ) {
    finish(event);
    return true;
  }

  const width = currentColWidth(view, resizeHandlePos, cell!
    .attrs as CellAttributes);

  setDragging({ startX: event.clientX, startWidth: width })(state, dispatch);

  function finish(event: MouseEvent) {
    window.removeEventListener('mouseup', finish);
    window.removeEventListener('mousemove', move);

    if (resizeHandleRef && resizeHandleRef.parentNode) {
      resizeHandleRef.parentNode.removeChild(resizeHandleRef);
      resizeHandleRef = null;
    }

    const { clientX } = event;
    const { state, dispatch } = view;
    const { dragging } = getPluginState(state);
    if (
      resizeHandlePos === null ||
      !pointsAtCell(state.doc.resolve(resizeHandlePos))
    ) {
      return;
    }
    // resizeHandlePos could be remapped via a collab change.
    // Fetch a fresh reference of the table.
    const $cell = state.doc.resolve(resizeHandlePos);
    const start = $cell.start(-1);
    const table = $cell.node(-1);

    // If we let go in the same place we started, dont need to do anything.
    if (dragging && clientX === dragging.startX) {
      setDragging(null)(state, dispatch);
      return;
    }

    let { tr } = state;
    if (dragging) {
      const { startX } = dragging;

      // If the table has changed (via collab for example) don't apply column widths
      // For example, if a table col is deleted we won't be able to reliably remap the new widths
      // There may be a more elegant solution to this, to avoid a jarring experience.
      if (table.eq(originalTable)) {
        const map = TableMap.get(table);
        const colIndex =
          map.colCount($cell.pos - start) +
          ($cell.nodeAfter ? $cell.nodeAfter.attrs.colspan : 1) -
          1;
        const selectionRect = getSelectionRect(state.selection);
        const selectedColumns = selectionRect
          ? getSelectedColumnIndexes(selectionRect)
          : [];
        // only selected (or selected - 1) columns should be distributed
        const resizingSelectedColumns =
          selectedColumns.indexOf(colIndex) > -1 ||
          selectedColumns.indexOf(colIndex + 1) > -1;
        const newResizeState = resizeColumn(
          resizeState,
          colIndex,
          clientX - startX,
          resizingSelectedColumns ? selectedColumns : undefined,
        );
        tr = updateColumnWidths(newResizeState, table, start)(tr);
      }

      setDragging(null, tr)(view.state, dispatch);
    }
  }

  function move(event: MouseEvent) {
    const { clientX, which } = event;
    const { state } = view;
    const { dragging } = getPluginState(state);
    if (
      !which ||
      !dragging ||
      resizeHandlePos === null ||
      !pointsAtCell(state.doc.resolve(resizeHandlePos))
    ) {
      return finish(event);
    }

    const $cell = state.doc.resolve(resizeHandlePos);
    const table = $cell.node(-1);
    const map = TableMap.get(table);
    const colIndex =
      map.colCount($cell.pos - $cell.start(-1)) +
      $cell.nodeAfter!.attrs.colspan -
      1;

    resizeColumn(resizeState, colIndex, clientX - dragging.startX);

    updateControls(state);
    updateResizeHandle(state, domAtPos, resizeHandlePos);
  }

  window.addEventListener('mouseup', finish);
  window.addEventListener('mousemove', move);

  return true;
};
