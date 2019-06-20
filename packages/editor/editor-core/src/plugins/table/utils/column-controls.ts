import { EditorView } from 'prosemirror-view';
import {
  findTable,
  getCellsInColumn,
  findDomRefAtPos,
  getSelectionRect,
  isColumnSelected,
  isTableSelected,
} from 'prosemirror-utils';
import { Selection } from 'prosemirror-state';
import { TableMap, CellSelection } from 'prosemirror-tables';
import { tableDeleteButtonSize } from '../ui/styles';

export interface ColumnParams {
  startIndex: number;
  endIndex: number;
  width: number;
}

export const getColumnsWidths = (view: EditorView): number[] => {
  const { selection } = view.state;
  const widths: number[] = [];
  const table = findTable(selection);
  if (table) {
    const map = TableMap.get(table.node);
    const domAtPos = view.domAtPos.bind(view);

    for (let i = 0; i < map.width; i++) {
      const cells = getCellsInColumn(i)(selection)!;
      const cell = cells[0];
      if (cell) {
        const cellRef = findDomRefAtPos(cell.pos, domAtPos) as HTMLElement;
        const rect = cellRef.getBoundingClientRect();
        widths[i] = (rect ? rect.width : cellRef.offsetWidth) + 1;
        i += cell.node.attrs.colspan - 1;
      }
    }
  }
  return widths;
};

export const isColumnInsertButtonVisible = (
  index: number,
  selection: Selection,
): boolean => {
  const rect = getSelectionRect(selection);
  if (
    rect &&
    selection instanceof CellSelection &&
    selection.isColSelection() &&
    !isTableSelected(selection) &&
    rect.right - index === index - rect.left
  ) {
    return false;
  }
  return true;
};

export const isColumnDeleteButtonVisible = (selection: Selection): boolean => {
  if (
    !isTableSelected(selection) &&
    (selection instanceof CellSelection && selection.isColSelection())
  ) {
    return true;
  }

  return false;
};

export const getColumnDeleteButtonParams = (
  columnsWidths: Array<number | undefined>,
  selection: Selection,
): { left: number; indexes: number[] } | null => {
  const rect = getSelectionRect(selection);
  if (!rect) {
    return null;
  }
  let width = 0;
  let offset = 0;
  // find the columns before the selection
  for (let i = 0; i < rect.left; i++) {
    const colWidth = columnsWidths[i];
    if (colWidth) {
      offset += colWidth - 1;
    }
  }
  // these are the selected columns widths
  const indexes: number[] = [];
  for (let i = rect.left; i < rect.right; i++) {
    const colWidth = columnsWidths[i];
    if (colWidth) {
      width += colWidth;
      indexes.push(i);
    }
  }

  const left = offset + width / 2 - tableDeleteButtonSize / 2;
  return { left, indexes };
};

export const getColumnsParams = (
  columnsWidths: Array<number | undefined>,
): ColumnParams[] => {
  const columns: ColumnParams[] = [];
  for (let i = 0, count = columnsWidths.length; i < count; i++) {
    const width = columnsWidths[i];
    if (!width) {
      continue;
    }
    let endIndex = columnsWidths.length;
    for (let k = i + 1, count = columnsWidths.length; k < count; k++) {
      if (columnsWidths[k]) {
        endIndex = k;
        break;
      }
    }
    columns.push({ startIndex: i, endIndex, width });
  }
  return columns;
};

export const getColumnClassNames = (
  index: number,
  selection: Selection,
  hoveredColumns: number[] = [],
  isInDanger?: boolean,
  isResizing?: boolean,
): string => {
  const classNames: string[] = [];
  if (
    isColumnSelected(index)(selection) ||
    (hoveredColumns.indexOf(index) > -1 && !isResizing)
  ) {
    classNames.push('active');
    if (isInDanger) {
      classNames.push('danger');
    }
  }
  return classNames.join(' ');
};
