import { containsClassName } from '../../../utils';
import { closestElement } from '../../../utils/dom';
import { TableCssClassName as ClassName } from '../types';
import { tableToolbarSize } from '../ui/styles';

export const isCell = (node: HTMLElement): boolean => {
  return (
    node &&
    (['TH', 'TD'].indexOf(node.tagName) > -1 ||
      !!closestElement(node, `.${ClassName.TABLE_HEADER_CELL}`) ||
      !!closestElement(node, `.${ClassName.TABLE_CELL}`))
  );
};

export const isCornerButton = (node: HTMLElement): boolean =>
  containsClassName(node, ClassName.CONTROLS_CORNER_BUTTON);

export const isInsertRowButton = (node: HTMLElement) =>
  containsClassName(node, ClassName.CONTROLS_INSERT_ROW) ||
  closestElement(node, `.${ClassName.CONTROLS_INSERT_ROW}`) ||
  (containsClassName(node, ClassName.CONTROLS_BUTTON_OVERLAY) &&
    closestElement(node, `.${ClassName.ROW_CONTROLS}`));

export const getColumnOrRowIndex = (target: HTMLElement): [number, number] => [
  parseInt(target.getAttribute('data-start-index') || '-1', 10),
  parseInt(target.getAttribute('data-end-index') || '-1', 10),
];

export const isColumnControlsDecorations = (node: HTMLElement): boolean =>
  containsClassName(node, ClassName.COLUMN_CONTROLS_DECORATIONS);

export const isRowControlsButton = (node: HTMLElement): boolean =>
  containsClassName(node, ClassName.ROW_CONTROLS_BUTTON) ||
  containsClassName(node, ClassName.NUMBERED_COLUMN_BUTTON);

export const isTableControlsButton = (node: HTMLElement): boolean =>
  containsClassName(node, ClassName.CONTROLS_BUTTON) ||
  containsClassName(node, ClassName.ROW_CONTROLS_BUTTON_WRAP);

export const getMousePositionHorizontalRelativeByElement = (
  mouseEvent: MouseEvent,
): 'left' | 'right' | null => {
  const element = mouseEvent.target;
  if (element instanceof HTMLElement) {
    const elementRect = element.getBoundingClientRect();
    if (elementRect.width <= 0) {
      return null;
    }

    const x = mouseEvent.clientX - elementRect.left;
    return x / elementRect.width > 0.5 ? 'right' : 'left';
  }

  return null;
};

export const getMousePositionVerticalRelativeByElement = (
  mouseEvent: MouseEvent,
): 'top' | 'bottom' | null => {
  const element = mouseEvent.target;
  if (element instanceof HTMLElement) {
    const elementRect = element.getBoundingClientRect();
    if (elementRect.height <= 0) {
      return null;
    }

    const y = mouseEvent.clientY - elementRect.top;
    return y / elementRect.height > 0.5 ? 'bottom' : 'top';
  }

  return null;
};

export const updateResizeHandles = (
  tableRef: HTMLElement | null | undefined,
) => {
  if (!tableRef) {
    return;
  }
  const height = tableRef.offsetHeight + tableToolbarSize;
  // see ED-7600
  const nodes = Array.from(
    tableRef.querySelectorAll(`.${ClassName.RESIZE_HANDLE}`) as NodeListOf<
      HTMLElement
    >,
  );
  if (!nodes || !nodes.length) {
    return;
  }

  nodes.forEach((node) => {
    node.style.height = `${height}px`;
  });
};
