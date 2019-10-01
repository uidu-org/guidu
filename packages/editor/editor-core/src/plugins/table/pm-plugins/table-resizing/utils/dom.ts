import { EditorState } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { getCellsInRow } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { closestElement, containsClassName } from '../../../../../utils';
import { updateOverflowShadows } from '../../../nodeviews/TableComponent';
import { TableCssClassName as ClassName } from '../../../types';
import { getPluginState as getMainPluginState } from '../../main';

function getHeights(
  children: NodeListOf<HTMLElement>,
): Array<number | undefined> {
  const heights: Array<number | undefined> = [];
  for (let i = 0, count = children.length; i < count; i++) {
    const child: HTMLElement = children[i] as HTMLElement;
    if (child) {
      const rect = child.getBoundingClientRect();
      const height = rect ? rect.height : child.offsetHeight;
      heights[i] = height;
    } else {
      heights[i] = undefined;
    }
  }
  return heights;
}

export const updateControls = (state: EditorState) => {
  const { tableRef } = getMainPluginState(state);
  if (!tableRef) {
    return;
  }
  const tr = tableRef.querySelector('tr');
  if (!tr) {
    return;
  }
  const wrapper = tableRef.parentElement;
  if (!(wrapper && wrapper.parentElement)) {
    return;
  }

  const rows = tableRef.querySelectorAll('tr');
  const rowControls = wrapper.parentElement.querySelectorAll<HTMLElement>(
    `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}`,
  );
  const numberedRows = wrapper.parentElement.querySelectorAll<HTMLElement>(
    ClassName.NUMBERED_COLUMN_BUTTON,
  );

  const rowHeights = getHeights(rows);

  // update rows controls height on resize
  for (let i = 0, count = rowControls.length; i < count; i++) {
    const height = rowHeights[i];
    if (height) {
      rowControls[i].style.height = `${height + 1}px`;

      if (numberedRows.length) {
        numberedRows[i].style.height = `${height + 1}px`;
      }
    }
  }

  updateOverflowShadows(
    wrapper,
    tableRef,
    wrapper.parentElement.querySelector<HTMLElement>(
      `.${ClassName.TABLE_RIGHT_SHADOW}`,
    ),
    wrapper.parentElement.querySelector<HTMLElement>(
      `.${ClassName.TABLE_LEFT_SHADOW}`,
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

export const getResizeCellPos = (
  view: EditorView,
  event: MouseEvent,
  lastColumnResizable: boolean,
): number | null => {
  const { state } = view;
  const target = event.target as HTMLElement;

  if (!containsClassName(target, ClassName.RESIZE_HANDLE)) {
    return null;
  }
  const parent = closestElement(target, '[data-start-index]');
  if (!parent) {
    return null;
  }
  const index = parseInt(parent.getAttribute('data-start-index') || '-1', 10);
  if (index === -1) {
    return null;
  }
  const cells = getCellsInRow(0)(state.selection);
  if (!cells) {
    return null;
  }
  const cellPos = cells[index].pos;
  if (!lastColumnResizable) {
    const $cell = state.doc.resolve(cellPos);
    const map = TableMap.get($cell.node(-1));
    if (map.width === index + 1) {
      return null;
    }
  }

  return cellPos;
};
