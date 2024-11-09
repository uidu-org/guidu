import { CellAttributes, TableLayout } from '@uidu/adf-schema';
import {
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
  akEditorGutterPadding,
  akEditorWideLayoutWidth,
  calcTableWidth,
  getBreakpoint,
  mapBreakpointToLayoutMaxWidth,
} from '@uidu/editor-common';
import { NodeSpec, ResolvedPos } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { containsClassName } from '../../../../../utils';
import { TableOptions } from '../../../nodeviews/types';

export const tableLayoutToSize: Record<string, number> = {
  default: akEditorDefaultLayoutWidth,
  wide: akEditorWideLayoutWidth,
  'full-width': akEditorFullWidthLayoutWidth,
};

// Translates named layouts in number values.
export function getLayoutSize(
  tableLayout: TableLayout,
  containerWidth: number = 0,
  options: TableOptions,
): number {
  const { isFullWidthModeEnabled } = options;

  if (isFullWidthModeEnabled) {
    return containerWidth
      ? Math.min(
          containerWidth - akEditorGutterPadding * 2,
          akEditorFullWidthLayoutWidth,
        )
      : akEditorFullWidthLayoutWidth;
  }

  const calculatedTableWidth = calcTableWidth(
    tableLayout,
    containerWidth,
    true,
  );
  if (calculatedTableWidth.endsWith('px')) {
    return parseInt(calculatedTableWidth, 10);
  }

  return tableLayoutToSize[tableLayout] || containerWidth;
}

export function getDefaultLayoutMaxWidth(containerWidth?: number): number {
  return mapBreakpointToLayoutMaxWidth(getBreakpoint(containerWidth));
}

// Does the current position point at a cell.
export function pointsAtCell($pos: ResolvedPos<any>) {
  return (
    ($pos.parent.type.spec as NodeSpec & { tableRole: string }).tableRole ===
      'row' && $pos.nodeAfter
  );
}

// Get the current col width, handles colspan.
export function currentColWidth(
  view: EditorView,
  cellPos: number,
  { colspan, colwidth }: CellAttributes,
): number {
  let width = colwidth && colwidth[colwidth.length - 1];
  if (width) {
    return width;
  }
  // Not fixed, read current width from DOM
  let domWidth = (view.domAtPos(cellPos + 1).node as HTMLElement).offsetWidth;
  let parts = colspan || 0;
  if (colwidth) {
    for (let i = 0; i < (colspan || 0); i++) {
      if (colwidth[i]) {
        domWidth -= colwidth[i];
        parts--;
      }
    }
  }

  return domWidth / parts;
}

// Attempts to find a parent TD/TH depending on target element.
export function domCellAround(target: HTMLElement | null): HTMLElement | null {
  while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
    target = containsClassName(target, 'ProseMirror')
      ? null
      : (target.parentNode as HTMLElement | null);
  }
  return target;
}
