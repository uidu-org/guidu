// #region Imports
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, getCellsInColumn, getCellsInRow } from 'prosemirror-utils';

import { createCommand, getPluginState } from '../pm-plugins/main';
import {
  TableCssClassName as ClassName,
  TableDecorations,
  Cell,
} from '../types';
import { findControlsHoverDecoration } from '../utils';
// #endregion

// #region Utils
export const createControlsHoverDecoration = (
  cells: Cell[],
  danger?: boolean,
): Decoration[] =>
  cells.map(cell => {
    const classes = [ClassName.HOVERED_CELL];
    if (danger) {
      classes.push('danger');
    }

    return Decoration.node(
      cell.pos,
      cell.pos + cell.node.nodeSize,
      {
        class: classes.join(' '),
      },
      { key: TableDecorations.CONTROLS_HOVER },
    );
  });

const updateDecorations = (
  node: PmNode,
  decorationSet: DecorationSet,
  newDecorations: Decoration[],
  find: (decorationSet: DecorationSet) => Decoration[],
): DecorationSet =>
  newDecorations.length
    ? decorationSet.add(node, newDecorations)
    : decorationSet.remove(find(decorationSet));

const getUpdatedDecorationSet = (
  state: EditorState<any>,
  cells: Cell[],
  isInDanger?: boolean,
) =>
  updateDecorations(
    state.doc,
    getPluginState(state).decorationSet,
    cells.length ? createControlsHoverDecoration(cells, isInDanger) : [],
    findControlsHoverDecoration,
  );

const makeArray = (n: number) => Array.from(Array(n).keys());
// #endregion

// #region Commands
export const hoverColumns = (hoveredColumns: number[], isInDanger?: boolean) =>
  createCommand(
    state => {
      const cells = getCellsInColumn(hoveredColumns)(state.selection);
      if (!cells) {
        return false;
      }

      return {
        type: 'HOVER_COLUMNS',
        data: {
          decorationSet: getUpdatedDecorationSet(state, cells, isInDanger),
          hoveredColumns,
          isInDanger,
        },
      };
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const hoverRows = (hoveredRows: number[], isInDanger?: boolean) =>
  createCommand(
    state => {
      const cells = getCellsInRow(hoveredRows)(state.selection);
      if (!cells) {
        return false;
      }

      return {
        type: 'HOVER_ROWS',
        data: {
          decorationSet: getUpdatedDecorationSet(state, cells, isInDanger),
          hoveredRows,
          isInDanger,
        },
      };
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const hoverTable = (isInDanger?: boolean) =>
  createCommand(
    state => {
      const table = findTable(state.selection);
      if (!table) {
        return false;
      }
      const map = TableMap.get(table.node);
      const hoveredColumns = makeArray(map.width);
      const hoveredRows = makeArray(map.height);
      const cells = getCellsInRow(hoveredRows)(state.selection);
      if (!cells) {
        return false;
      }

      return {
        type: 'HOVER_TABLE',
        data: {
          decorationSet: getUpdatedDecorationSet(state, cells, isInDanger),
          hoveredColumns,
          hoveredRows,
          isInDanger,
        },
      };
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const clearHoverSelection = () =>
  createCommand(state => ({
    type: 'CLEAR_HOVER_SELECTION',
    data: {
      decorationSet: getUpdatedDecorationSet(state, []),
    },
  }));
// #endregion
