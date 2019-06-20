// #region Imports
import { Transaction } from 'prosemirror-state';
import { findTable, findParentNodeOfType } from 'prosemirror-utils';
import { defaultTableSelection } from './pm-plugins/main';
import { TablePluginState } from './types';
import { findControlsHoverDecoration } from './utils';
// #endregion

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

  const hoverDecoration = findControlsHoverDecoration(
    pluginState.decorationSet,
  );

  if (
    pluginState.tableNode !== tableNode ||
    pluginState.targetCellPosition !== targetCellPosition ||
    hoverDecoration.length
  ) {
    const nextPluginState = {
      ...pluginState,
      ...defaultTableSelection,
      // @see: https://product-fabric.atlassian.net/browse/ED-3796
      decorationSet: pluginState.decorationSet.remove(hoverDecoration),
      targetCellPosition,
      tableNode,
    };
    return nextPluginState;
  }

  return pluginState;
};
