import { Node as PMNode, NodeType } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { findTable, safeInsert } from 'prosemirror-utils';
import { Command } from '../../types';
import { GapCursorSelection, Side } from '../gap-cursor';
import { createCommand } from './pm-plugins/plugin-factory';
import { findExpand } from './utils';

export const setExpandRef = (ref?: HTMLDivElement | null): Command =>
  createCommand(
    {
      type: 'SET_EXPAND_REF',
      data: {
        ref,
      },
    },
    (tr) => tr.setMeta('addToHistory', false),
  );

export const deleteExpandAtPos =
  (expandNodePos: number, expandNode: PMNode): Command =>
  (state, dispatch) => {
    if (!expandNode || isNaN(expandNodePos)) {
      return false;
    }

    if (expandNode && dispatch) {
      dispatch(
        state.tr.delete(expandNodePos, expandNodePos + expandNode.nodeSize),
      );
    }

    return true;
  };

export const deleteExpand = (): Command => (state, dispatch) => {
  const expandNode = findExpand(state);
  if (!expandNode) {
    return false;
  }

  return deleteExpandAtPos(expandNode.pos, expandNode.node)(state, dispatch);
};

export const selectExpand =
  (pos: number): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setSelection(new NodeSelection(state.doc.resolve(pos))),
      );
    }
    return true;
  };

export const updateExpandTitle =
  (title: string, pos: number, nodeType: NodeType): Command =>
  (state, dispatch) => {
    const node = state.doc.nodeAt(pos);
    if (node && node.type === nodeType && dispatch) {
      const { tr } = state;
      tr.setNodeMarkup(
        pos,
        node.type,
        {
          ...node.attrs,
          title,
        },
        node.marks,
      );
      dispatch(tr);
    }
    return true;
  };

export const toggleExpandExpanded =
  (pos: number, nodeType: NodeType): Command =>
  (state, dispatch) => {
    const node = state.doc.nodeAt(pos);
    if (node && node.type === nodeType && dispatch) {
      const { tr } = state;
      const isExpandedNext = !node.attrs.__expanded;
      tr.setNodeMarkup(
        pos,
        node.type,
        {
          ...node.attrs,
          __expanded: isExpandedNext,
        },
        node.marks,
      );

      // If we're going to collapse the expand and our cursor is currently inside
      // Move to a right gap cursor, if the toolbar is interacted (or an API),
      // it will insert below rather than inside (which will be invisible).
      if (isExpandedNext === false && findExpand(state)) {
        tr.setSelection(
          new GapCursorSelection(
            state.doc.resolve(pos + node.nodeSize),
            Side.RIGHT,
          ),
        );
      }

      // `isRemote` meta prevents this step from being
      // sync'd between sessions in collab edit
      dispatch(tr.setMeta('isRemote', true));
    }
    return true;
  };

export const createExpandNode = (state: EditorState): PMNode => {
  const { expand, nestedExpand } = state.schema.nodes;
  const expandType = findTable(state.selection) ? nestedExpand : expand;
  return expandType.createAndFill({});
};

export const insertExpand: Command = (state, dispatch) => {
  const expandNode = createExpandNode(state);

  if (dispatch) {
    dispatch(safeInsert(expandNode)(state.tr).scrollIntoView());
  }

  return true;
};
