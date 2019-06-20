import {
  getSelectionRect,
  isRowSelected,
  isTableSelected,
} from 'prosemirror-utils';
import { Selection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { tableDeleteButtonSize } from '../ui/styles';

export interface RowParams {
  startIndex: number;
  endIndex: number;
  height: number;
}

export const getRowHeights = (tableRef: HTMLTableElement): number[] => {
  const heights: number[] = [];
  if (tableRef.lastChild) {
    const rows = tableRef.lastChild.childNodes;
    for (let i = 0, count = rows.length; i < count; i++) {
      const cell = rows[i] as HTMLTableCellElement;
      const rect = cell.getBoundingClientRect();
      heights[i] = (rect ? rect.height : cell.offsetHeight) + 1;
    }
  }
  return heights;
};

export const isRowInsertButtonVisible = (
  index: number,
  selection: Selection,
): boolean => {
  const rect = getSelectionRect(selection);
  if (
    rect &&
    selection instanceof CellSelection &&
    selection.isRowSelection() &&
    !isTableSelected(selection) &&
    rect.bottom - index === index - rect.top
  ) {
    return false;
  }
  return true;
};

export const isRowDeleteButtonVisible = (selection: Selection): boolean => {
  if (
    !isTableSelected(selection) &&
    (selection instanceof CellSelection && selection.isRowSelection())
  ) {
    return true;
  }

  return false;
};

export const getRowDeleteButtonParams = (
  rowsHeights: Array<number | undefined>,
  selection: Selection,
): { top: number; indexes: number[] } | null => {
  const rect = getSelectionRect(selection);
  if (!rect) {
    return null;
  }
  let height = 0;
  let offset = 0;
  // find the rows before the selection
  for (let i = 0; i < rect.top; i++) {
    const rowHeight = rowsHeights[i];
    if (rowHeight) {
      offset += rowHeight - 1;
    }
  }
  // these are the selected rows widths
  const indexes: number[] = [];
  for (let i = rect.top; i < rect.bottom; i++) {
    const rowHeight = rowsHeights[i];
    if (rowHeight) {
      height += rowHeight - 1;
      indexes.push(i);
    }
  }

  const top = offset + height / 2 - tableDeleteButtonSize / 2;
  return { top, indexes };
};

export const getRowsParams = (
  rowsHeights: Array<number | undefined>,
): RowParams[] => {
  const rows: RowParams[] = [];
  for (let i = 0, count = rowsHeights.length; i < count; i++) {
    const height = rowsHeights[i];
    if (!height) {
      continue;
    }
    let endIndex = rowsHeights.length;
    for (let k = i + 1, count = rowsHeights.length; k < count; k++) {
      if (rowsHeights[k]) {
        endIndex = k;
        break;
      }
    }
    rows.push({ startIndex: i, endIndex, height });
  }
  return rows;
};

export const getRowClassNames = (
  index: number,
  selection: Selection,
  hoveredRows: number[] = [],
  isInDanger?: boolean,
  isResizing?: boolean,
): string => {
  const classNames: string[] = [];
  if (
    isRowSelected(index)(selection) ||
    (hoveredRows.indexOf(index) > -1 && !isResizing)
  ) {
    classNames.push('active');
    if (isInDanger) {
      classNames.push('danger');
    }
  }
  return classNames.join(' ');
};
