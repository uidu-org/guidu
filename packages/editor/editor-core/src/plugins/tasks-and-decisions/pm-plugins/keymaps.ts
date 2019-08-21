import { keymap } from 'prosemirror-keymap';
import { ResolvedPos, Schema } from 'prosemirror-model';
import { EditorState, Selection, Transaction, Plugin } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import {
  isSupportedSourceNode,
  splitListAtSelection,
  insertTaskDecisionWithAnalytics,
} from '../commands';
import { INPUT_METHOD } from '../../analytics';
import { TaskDecisionListType } from '../types';

// tries to find a valid cursor position
const setTextSelection = (pos: number) => (tr: Transaction) => {
  const newSelection = Selection.findFrom(tr.doc.resolve(pos), -1, true);
  if (newSelection) {
    tr.setSelection(newSelection);
  }
  return tr;
};

const isInsideTaskOrDecisionItem = (state: EditorState) => {
  const { decisionItem, taskItem } = state.schema.nodes;
  return hasParentNodeOfType([decisionItem, taskItem])(state.selection);
};

export function keymapPlugin(schema: Schema): Plugin | undefined {
  const deleteCurrentItem = ($from: ResolvedPos, tr: Transaction) => {
    return tr.delete($from.before($from.depth) - 1, $from.end($from.depth) + 1);
  };

  /*
   * Since the DecisionItem and TaskItem only accepts inline-content, we won't get any of the default behaviour from ProseMirror
   * eg. behaviour for backspace and enter etc. So we need to implement it.
   */
  const keymaps = {
    Backspace: (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const {
        selection,
        schema: { nodes },
        tr,
      } = state;
      const { decisionList, decisionItem, taskList, taskItem } = nodes;

      if ((!decisionItem || !decisionList) && (!taskList || !taskItem)) {
        return false;
      }

      const { $from, $to } = selection;

      // Don't do anything if selection is a range
      if ($from.pos !== $to.pos) {
        return false;
      }

      // Don't do anything if the cursor isn't at the beginning of the node.
      if ($from.parentOffset !== 0) {
        return false;
      }

      const previousPos = tr.doc.resolve(
        Math.max(0, $from.before($from.depth) - 1),
      );

      const previousNodeType =
        previousPos.pos > 0 && previousPos.node(1) && previousPos.node(1).type;
      const parentNodeType = $from.node(1).type;
      const previousNodeIsList =
        previousNodeType === decisionList || previousNodeType === taskList;
      const parentNodeIsList =
        parentNodeType === decisionList || parentNodeType === taskList;

      if (previousNodeIsList && !parentNodeIsList) {
        const content = $from.node($from.depth).content;
        const insertPos = previousPos.pos - 1;
        deleteCurrentItem($from, tr).insert(insertPos, content);
        dispatch(setTextSelection(insertPos)(tr).scrollIntoView());
        return true;
      }

      const nodeType = $from.node().type;
      if (nodeType !== decisionItem && nodeType !== taskItem) {
        return false;
      }

      dispatch(splitListAtSelection(tr, schema));

      return true;
    },
    Delete: (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const {
        selection,
        schema: { nodes },
        tr,
      } = state;
      const nodeIsTaskOrDecisionItem = isInsideTaskOrDecisionItem(state);
      const { decisionList, decisionItem, taskList, taskItem } = nodes;

      if (
        ((!decisionItem || !decisionList) && (!taskList || !taskItem)) ||
        !nodeIsTaskOrDecisionItem
      ) {
        return false;
      }

      const { $from, $to } = selection;

      // Don't do anything if selection is a range
      if ($from.pos !== $to.pos) {
        return false;
      }

      // Don't do anything if the cursor isn't at the end of the node.
      const endOfItem = $from.end();
      const isAtEndOfItem = $from.pos === endOfItem;

      if (!isAtEndOfItem) {
        return false;
      }

      const list = $from.node($from.depth - 1);
      const isAtEndOfList = list.lastChild === $from.node();

      // split list, converted next item to a paragraph when not at end
      if (!isAtEndOfList) {
        setTextSelection(endOfItem + 2)(tr);
        splitListAtSelection(tr, schema);
        setTextSelection($from.pos)(tr);
        tr.scrollIntoView();
        dispatch(tr);
        return true;
      }

      const listPos = tr.doc.resolve($from.after($from.depth - 1));
      const nodeAfterList = listPos.nodeAfter;

      if (!nodeAfterList) {
        // nothing after - default to prosemirror
        return false;
      }

      if (!isSupportedSourceNode(schema, selection)) {
        // Unsupported content in following node, do nothing.
        return true;
      }

      const nodeAfterPos = tr.doc.resolve(listPos.pos + 1);
      const nodeAfterType = nodeAfterList.type;
      if (nodeAfterType === decisionList || nodeAfterType === taskList) {
        // Do nothing until FS-2896 is implemented
        return true;
      }

      const newContent = nodeAfterList.content;
      tr.delete(nodeAfterPos.before(), nodeAfterPos.after());
      tr.insert($from.pos, newContent);
      setTextSelection($from.pos)(tr);
      tr.scrollIntoView();
      dispatch(tr);

      return true;
    },

    Enter: (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const { selection, tr } = state;
      const { $from } = selection;
      const nodeIsTaskOrDecisionItem = isInsideTaskOrDecisionItem(state);
      const node = $from.node($from.depth);
      const nodeType = node && node.type;
      const isEmpty = node && node.textContent.length === 0;
      const listType: TaskDecisionListType =
        nodeType === state.schema.nodes.taskItem ? 'taskList' : 'decisionList';

      if (nodeIsTaskOrDecisionItem) {
        if (!isEmpty) {
          const addItem = ({
            tr,
            itemLocalId,
          }: {
            tr: Transaction;
            itemLocalId?: string;
          }) =>
            tr.split($from.pos, 1, [
              { type: nodeType, attrs: { localId: itemLocalId } },
            ]);
          const insertTr = insertTaskDecisionWithAnalytics(
            state,
            listType,
            INPUT_METHOD.KEYBOARD,
            addItem,
          );

          if (insertTr) {
            insertTr.scrollIntoView();
            dispatch(insertTr);
          }
          return true;
        }

        // Otherwise, split list
        splitListAtSelection(tr, schema);
        dispatch(tr);
        return true;
      }
      return false;
    },
  };
  return keymap(keymaps);
}

export default keymapPlugin;
