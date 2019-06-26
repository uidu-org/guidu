import { akEditorTableToolbarSize, tableResizeHandleWidth } from '@uidu/editor-common';
import { EditorState } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { closestElement } from '../../../../../utils';
import { updateRightShadow } from '../../../nodeviews/TableComponent';
import { TableCssClassName as ClassName } from '../../../types';
import { getPluginState as getMainPluginState } from '../../main';
import { domCellAround, edgeCell, pointsAtCell } from './misc';

export const updateControls = (state: EditorState) => {
  const { tableRef } = getMainPluginState(state);
  if (!tableRef) {
    return undefined;
  }
  const tr = tableRef.querySelector('tr');
  if (!tr) {
    return undefined;
  }
  const cols = tr.children;
  const wrapper = tableRef.parentElement;
  if (!(wrapper && wrapper.parentElement)) {
    return undefined;
  }

  const columnControls = wrapper.querySelectorAll<HTMLElement>(
    `.${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}`,
  );
  const rows = tableRef.querySelectorAll('tr');
  const rowControls = wrapper.parentElement.querySelectorAll<HTMLElement>(
    `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}`,
  );
  const numberedRows = wrapper.parentElement.querySelectorAll<HTMLElement>(
    ClassName.NUMBERED_COLUMN_BUTTON,
  );

  const getWidth = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    return rect ? rect.width : element.offsetWidth;
  };

  // update column controls width on resize
  for (let i = 0, count = columnControls.length; i < count; i++) {
    if (cols[i]) {
      columnControls[i].style.width = `${getWidth(cols[i] as HTMLElement) +
        1}px`;
    }
  }
  // update rows controls height on resize
  for (let i = 0, count = rowControls.length; i < count; i++) {
    if (rows[i]) {
      rowControls[i].style.height = `${getHeight(rows[i]) + 1}px`;

      if (numberedRows.length) {
        numberedRows[i].style.height = `${getHeight(rows[i]) + 1}px`;
      }
    }
  }

  updateRightShadow(
    wrapper,
    tableRef,
    wrapper.parentElement.querySelector<HTMLElement>(
      `.${ClassName.TABLE_RIGHT_SHADOW}`,
    ),
  );
};

export const isClickNear = (
  event: MouseEvent,
  click: { x: number; y: number },
): boolean => {
  const dx = click.x - event.clientX,
    dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100;
};

export const createResizeHandle = (
  tableRef: HTMLTableElement,
): HTMLDivElement | null => {
  const resizeHandleRef = document.createElement('div');
  resizeHandleRef.className = ClassName.COLUMN_RESIZE_HANDLE;
  tableRef.parentNode!.appendChild(resizeHandleRef);

  const tableActive = closestElement(tableRef, `.${ClassName.WITH_CONTROLS}`);
  const style = {
    height: `${
      tableActive
        ? tableRef.offsetHeight + akEditorTableToolbarSize
        : tableRef.offsetHeight
    }px`,
    top: `${
      tableActive
        ? tableRef.offsetTop - akEditorTableToolbarSize
        : tableRef.offsetTop
    }px`,
  };

  resizeHandleRef.style.top = style.top;
  resizeHandleRef.style.height = style.height;

  return resizeHandleRef;
};

export const updateResizeHandle = (
  state: EditorState,
  domAtPos: (pos: number) => { node: Node; offset: number },
  resizeHandlePos: number,
) => {
  if (
    resizeHandlePos === null ||
    !pointsAtCell(state.doc.resolve(resizeHandlePos))
  ) {
    return false;
  }

  const $cell = state.doc.resolve(resizeHandlePos);
  const tablePos = $cell.start(-1) - 1;
  const tableWrapperRef = findDomRefAtPos(tablePos, domAtPos) as HTMLDivElement;

  const resizeHandleRef = tableWrapperRef.querySelector(
    `.${ClassName.COLUMN_RESIZE_HANDLE}`,
  ) as HTMLDivElement;

  const tableRef = tableWrapperRef.querySelector(`table`) as HTMLTableElement;

  if (tableRef && resizeHandleRef) {
    const cellRef = findDomRefAtPos(
      resizeHandlePos,
      domAtPos,
    ) as HTMLTableCellElement;
    const tableActive = closestElement(tableRef, `.${ClassName.WITH_CONTROLS}`);
    resizeHandleRef.style.height = `${
      tableActive
        ? tableRef.offsetHeight + akEditorTableToolbarSize
        : tableRef.offsetHeight
    }px`;

    resizeHandleRef.style.left = `${cellRef.offsetLeft +
      cellRef.offsetWidth}px`;
  }
  return undefined;
};

function getHeight(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  return rect ? rect.height : element.offsetHeight;
}

export const getResizeCellPos = (
  view: EditorView,
  event: MouseEvent,
  lastColumnResizable: boolean,
): number | null => {
  const { state } = view;
  const target = domCellAround(event.target as HTMLElement | null);
  let cellPos: number | null = null;

  if (target) {
    const { left, right } = target.getBoundingClientRect();
    if (event.clientX - left <= tableResizeHandleWidth) {
      cellPos = edgeCell(view, event, 'left', tableResizeHandleWidth);
    } else if (right - event.clientX <= tableResizeHandleWidth) {
      cellPos = edgeCell(view, event, 'right', tableResizeHandleWidth);
    }
  }

  if (!lastColumnResizable && cellPos !== null) {
    const $cell = state.doc.resolve(cellPos);
    const map = TableMap.get($cell.node(-1));
    const start = $cell.start(-1);
    const columnIndex =
      map.colCount($cell.pos - start) + $cell.nodeAfter!.attrs.colspan - 1;

    if (columnIndex === map.width - 1) {
      return null;
    }
  }

  return cellPos;
};
