// #region Imports
import { Transaction } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { findTable, findParentNodeOfType } from 'prosemirror-utils';
import { DecorationSet } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { defaultTableSelection } from './pm-plugins/main';
import { TablePluginState, TableDecorations } from './types';
import {
  findControlsHoverDecoration,
  updateNodeDecorations,
  createColumnControlsDecoration,
  createColumnSelectedDecorations,
} from './utils';
import { findColumnControlSelectedDecoration } from './utils/decoration';
// #endregion

const getDecorationSet = (
  tr: Transaction,
  allowControls: boolean,
  tableNode?: PmNode,
): DecorationSet => {
  let decorationSet = DecorationSet.empty;

  if (allowControls && tableNode) {
    decorationSet = updateNodeDecorations(
      tr.doc,
      decorationSet,
      createColumnControlsDecoration(tr.selection),
      TableDecorations.COLUMN_CONTROLS_DECORATIONS,
    );
  }

  if (tr.selection instanceof CellSelection && tr.selection.isColSelection()) {
    decorationSet = updateNodeDecorations(
      tr.doc,
      decorationSet,
      createColumnSelectedDecorations(tr),
      TableDecorations.COLUMN_SELECTED,
    );
  }

  return decorationSet;
};

export const handleDocOrSelectionChanged = (
  tr: Transaction,
  pluginState: TablePluginState,
): TablePluginState => {
  let tableNode;
  let targetCellPosition;
  const table = findTable(tr.selection);
  if (table) {
    tableNode = table.node;
    const { tableCell, tableHeader } = tr.doc.type.schema.nodes;
    const cell = findParentNodeOfType([tableCell, tableHeader])(tr.selection);
    targetCellPosition = cell ? cell.pos : undefined;
  }

  const {
    pluginConfig: { allowControls = true },
  } = pluginState;

  const hoverDecoration = findControlsHoverDecoration(
    pluginState.decorationSet,
  );

  // @see: https://product-fabric.atlassian.net/browse/ED-7304
  const selectedColumnControlsDecoration = findColumnControlSelectedDecoration(
    pluginState.decorationSet,
  );

  if (
    pluginState.tableNode !== tableNode ||
    pluginState.targetCellPosition !== targetCellPosition ||
    hoverDecoration.length ||
    selectedColumnControlsDecoration.length
  ) {
    const decorationSet = getDecorationSet(tr, allowControls, tableNode);

    const nextPluginState = {
      ...pluginState,
      ...defaultTableSelection,
      // @see: https://product-fabric.atlassian.net/browse/ED-3796
      decorationSet: decorationSet.remove(hoverDecoration),
      targetCellPosition,
      tableNode,
    };
    return nextPluginState;
  }

  return pluginState;
};
