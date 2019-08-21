import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import {
  TableCssClassName as ClassName,
  TableDecorations,
  Cell,
} from '../types';
import {
  getCellsInRow,
  ContentNodeWithPos,
  getSelectionRect,
  findTable,
} from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import { getPluginState } from '../pm-plugins/main';
import { CellAttributes } from '@atlaskit/adf-schema';

const filterDecorationByKey = (
  key: TableDecorations,
  decorationSet: DecorationSet,
): Decoration[] =>
  decorationSet.find(undefined, undefined, spec => spec.key.indexOf(key) > -1);

export const findColumnControlSelectedDecoration = (
  decorationSet: DecorationSet,
): Decoration[] =>
  filterDecorationByKey(TableDecorations.COLUMN_SELECTED, decorationSet);

export const findControlsHoverDecoration = (
  decorationSet: DecorationSet,
): Decoration[] =>
  filterDecorationByKey(TableDecorations.ALL_CONTROLS_HOVER, decorationSet);

export const createControlsHoverDecoration = (
  cells: Cell[],
  type: 'row' | 'column' | 'table',
  danger?: boolean,
): Decoration[] =>
  cells.map(cell => {
    const classes = [ClassName.HOVERED_CELL];
    if (danger) {
      classes.push(ClassName.HOVERED_CELL_IN_DANGER);
    }

    classes.push(
      type === 'column'
        ? ClassName.HOVERED_COLUMN
        : type === 'row'
        ? ClassName.HOVERED_ROW
        : ClassName.HOVERED_TABLE,
    );

    let key: TableDecorations;
    switch (type) {
      case 'row':
        key = TableDecorations.ROW_CONTROLS_HOVER;
        break;

      case 'column':
        key = TableDecorations.COLUMN_CONTROLS_HOVER;
        break;

      default:
        key = TableDecorations.TABLE_CONTROLS_HOVER;
        break;
    }

    return Decoration.node(
      cell.pos,
      cell.pos + cell.node.nodeSize,
      {
        class: classes.join(' '),
      },
      { key },
    );
  });

export const createColumnSelectedDecorations = (
  tr: Transaction,
): Decoration[] => {
  const { selection, doc } = tr;
  const table = findTable(selection);
  const rect = getSelectionRect(selection);

  if (!table || !rect) {
    return [];
  }

  const map = TableMap.get(table.node);
  const cellPositions = map.cellsInRect(rect);

  return cellPositions.map((pos, index) => {
    const cell = doc.nodeAt(pos + table.start);

    return Decoration.node(
      pos + table.start,
      pos + table.start + cell!.nodeSize,
      {
        class: ClassName.COLUMN_SELECTED,
      },
      {
        key: `${TableDecorations.COLUMN_SELECTED}_${index}`,
      },
    );
  });
};

export const createColumnControlsDecoration = (
  selection: Selection,
): Decoration[] => {
  const cells: ContentNodeWithPos[] = getCellsInRow(0)(selection) || [];
  let index = 0;
  return cells.map(cell => {
    const colspan = (cell.node.attrs as CellAttributes).colspan || 1;
    const element = document.createElement('div');
    element.classList.add(ClassName.COLUMN_CONTROLS_DECORATIONS);
    element.dataset.startIndex = `${index}`;
    index += colspan;
    element.dataset.endIndex = `${index}`;

    return Decoration.widget(
      cell.pos + 1,
      // Do not delay the rendering for this Decoration
      // because we need to always render all controls
      // to keep the order safe
      element,
      {
        key: `${TableDecorations.COLUMN_CONTROLS_DECORATIONS}_${index}`,
        // this decoration should be the first one, even before gap cursor.
        side: -100,
      },
    );
  });
};

export const updateNodeDecorations = (
  node: PmNode,
  decorationSet: DecorationSet,
  decorations: Decoration[],
  key: TableDecorations,
): DecorationSet => {
  const filteredDecorations = filterDecorationByKey(key, decorationSet);
  const decorationSetFiltered = decorationSet.remove(filteredDecorations);

  return decorationSetFiltered.add(node, decorations);
};

export const updatePluginStateDecorations = (
  state: EditorState<any>,
  decorations: Decoration[],
  key: TableDecorations,
): DecorationSet =>
  updateNodeDecorations(
    state.doc,
    getPluginState(state).decorationSet || DecorationSet.empty,
    decorations,
    key,
  );
