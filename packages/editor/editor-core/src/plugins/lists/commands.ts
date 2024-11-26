import * as baseCommand from 'prosemirror-commands';
import {
  Fragment,
  Node,
  NodeRange,
  NodeType,
  ResolvedPos,
  Slice,
} from 'prosemirror-model';
import * as baseListCommand from 'prosemirror-schema-list';
import {
  EditorState,
  NodeSelection,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import { liftTarget, ReplaceAroundStep } from 'prosemirror-transform';
import {
  findParentNodeOfTypeClosestToPos,
  findPositionOfNodeBefore,
  hasParentNodeOfType,
} from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { Command } from '../../types';
import { compose, sanitiseSelectionMarksForWrapping } from '../../utils';
import {
  filter,
  findCutBefore,
  insertContentDeleteRange,
  isEmptySelectionAtEnd,
  isEmptySelectionAtStart,
  isFirstChildOfParent,
  walkNextNode,
} from '../../utils/commands';
import { hasVisibleContent, isNodeEmpty } from '../../utils/document';
import { INPUT_METHOD } from '../analytics';
import { GapCursorSelection } from '../gap-cursor';
import { liftFollowingList, liftSelectionList } from './transforms';

export type InputMethod = INPUT_METHOD.KEYBOARD | INPUT_METHOD.TOOLBAR;

const maxIndentation = 5;

const deletePreviousEmptyListItem: Command = (state, dispatch) => {
  const { $from } = state.selection;
  const { listItem } = state.schema.nodes;

  const $cut = findCutBefore($from);
  if (!$cut || !$cut.nodeBefore || !($cut.nodeBefore.type === listItem)) {
    return false;
  }

  const previousListItemEmpty =
    $cut.nodeBefore.childCount === 1 &&
    $cut.nodeBefore.firstChild.nodeSize <= 2;

  if (previousListItemEmpty) {
    const { tr } = state;

    if (dispatch) {
      dispatch(
        tr
          .delete($cut.pos - $cut.nodeBefore.nodeSize, $from.pos)
          .scrollIntoView(),
      );
    }
    return true;
  }

  return false;
};

const joinToPreviousListItem: Command = (state, dispatch) => {
  const { $from } = state.selection;
  const { paragraph, listItem, codeBlock, bulletList, orderedList } =
    state.schema.nodes;
  const isGapCursorShown = state.selection instanceof GapCursorSelection;
  const $cutPos = isGapCursorShown ? state.doc.resolve($from.pos + 1) : $from;
  const $cut = findCutBefore($cutPos);
  if (!$cut) {
    return false;
  }

  // see if the containing node is a list
  if (
    $cut.nodeBefore &&
    [bulletList, orderedList].indexOf($cut.nodeBefore.type) > -1
  ) {
    // and the node after this is a paragraph or a codeBlock
    if (
      $cut.nodeAfter &&
      ($cut.nodeAfter.type === paragraph || $cut.nodeAfter.type === codeBlock)
    ) {
      // find the nearest paragraph that precedes this node
      let $lastNode = $cut.doc.resolve($cut.pos - 1);

      while ($lastNode.parent.type !== paragraph) {
        $lastNode = state.doc.resolve($lastNode.pos - 1);
      }

      let { tr } = state;
      if (isGapCursorShown) {
        const nodeBeforePos = findPositionOfNodeBefore(tr.selection);
        if (typeof nodeBeforePos !== 'number') {
          return false;
        }
        // append the codeblock to the list node
        const list = $cut.nodeBefore.copy(
          $cut.nodeBefore.content.append(
            Fragment.from(listItem.createChecked({}, $cut.nodeAfter)),
          ),
        );
        tr.replaceWith(
          nodeBeforePos,
          $from.pos + $cut.nodeAfter.nodeSize,
          list,
        );
      } else {
        // take the text content of the paragraph and insert after the paragraph up until before the the cut
        tr = state.tr.step(
          new ReplaceAroundStep(
            $lastNode.pos,
            $cut.pos + $cut.nodeAfter.nodeSize,
            $cut.pos + 1,
            $cut.pos + $cut.nodeAfter.nodeSize - 1,
            state.tr.doc.slice($lastNode.pos, $cut.pos),
            0,
            true,
          ),
        );
      }

      // find out if there's now another list following and join them
      // as in, [list, p, list] => [list with p, list], and we want [joined list]
      const $postCut = tr.doc.resolve(
        tr.mapping.map($cut.pos + $cut.nodeAfter.nodeSize),
      );
      if (
        $postCut.nodeBefore &&
        $postCut.nodeAfter &&
        $postCut.nodeBefore.type === $postCut.nodeAfter.type &&
        [bulletList, orderedList].indexOf($postCut.nodeBefore.type) > -1
      ) {
        tr = tr.join($postCut.pos);
      }

      if (dispatch) {
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
  }

  return false;
};

const isInsideListItem = (state: EditorState): boolean => {
  const { $from } = state.selection;
  const { listItem, paragraph } = state.schema.nodes;

  if (state.selection instanceof GapCursorSelection) {
    return $from.parent.type === listItem;
  }

  return (
    hasParentNodeOfType(listItem)(state.selection) &&
    $from.parent.type === paragraph
  );
};

const canToJoinToPreviousListItem = (state: EditorState): boolean => {
  const { $from } = state.selection;
  const { bulletList, orderedList } = state.schema.nodes;

  const $before = state.doc.resolve($from.pos - 1);
  let nodeBefore = $before ? $before.nodeBefore : null;

  if (state.selection instanceof GapCursorSelection) {
    nodeBefore = $from.nodeBefore;
  }

  return (
    !!nodeBefore && [bulletList, orderedList].indexOf(nodeBefore.type) > -1
  );
};

const canOutdent = (state: EditorState): boolean => {
  const { parent } = state.selection.$from;
  const { listItem, paragraph } = state.schema.nodes;

  if (state.selection instanceof GapCursorSelection) {
    return parent.type === listItem;
  }

  return (
    parent.type === paragraph && hasParentNodeOfType(listItem)(state.selection)
  );
};

export const enterKeyCommand: Command = (state, dispatch): boolean => {
  const { selection } = state;
  if (selection.empty) {
    const { $from } = selection;
    const { listItem, codeBlock } = state.schema.nodes;
    const node = $from.node($from.depth);
    const wrapper = $from.node($from.depth - 1);

    if (wrapper && wrapper.type === listItem) {
      /** Check if the wrapper has any visible content */
      const wrapperHasContent = hasVisibleContent(wrapper);
      if (isNodeEmpty(node) && !wrapperHasContent) {
        return outdentList()(state, dispatch);
      }
      if (!hasParentNodeOfType(codeBlock)(selection)) {
        return splitListItem(listItem)(state, dispatch);
      }
    }
  }
  return false;
};

export const deleteKeyCommand: Command = (state, dispatch): boolean => {
  const { tr } = state;
  const { $head } = state.selection;

  const headGrandParent = $head.node(-1);
  const headGreatGrandParent = $head.node(-2);

  if (
    isEmptySelectionAtEnd(state) &&
    headGrandParent &&
    headGrandParent.type.name === 'listItem'
  ) {
    const { $pos: $next, foundNode } = walkNextNode($head);

    const nextGrandParent = $next.node(-1);

    if (foundNode) {
      if ($next.parent && $next.parent.type.name === 'paragraph') {
        // Next is a paragraph

        const { content } = $next.parent;

        insertContentDeleteRange(
          tr,
          (tr) => tr.doc.resolve($head.pos),
          [
            [content, $head.pos], // Insert text content into the current paragraph
          ],
          [
            [$next.before(), $next.before() + $next.parent.nodeSize], // Delete range for next node
          ],
        );

        if (dispatch) {
          dispatch(tr);
        }

        return true;
      }
      if (
        headGreatGrandParent === nextGrandParent &&
        headGreatGrandParent !== undefined &&
        $next.parent.firstChild &&
        $next.parent.firstChild.type.name === 'paragraph'
      ) {
        // Next is a node with a paragraph inside, with the same list as the parent

        const { content } = $next.parent.firstChild;
        const childrenContent = $next.parent.content.cut(
          $next.parent.firstChild.nodeSize,
        );

        insertContentDeleteRange(
          tr,
          (tr) => tr.doc.resolve($head.pos),
          [
            [content, $head.pos], // Insert text content into the current paragraph
            [childrenContent, $head.after()], // Insert children nodes of the next list element, after this paragraph
          ],
          [
            [$next.before(), $next.before() + $next.parent.nodeSize], // Delete range for next node
          ],
        );

        if (dispatch) {
          dispatch(tr);
        }

        return true;
      }
    }
  }

  return false;
};

export const backspaceKeyCommand = baseCommand.chainCommands(
  // if we're at the start of a list item, we need to either backspace
  // directly to an empty list item above, or outdent this node
  filter(
    [
      isEmptySelectionAtStart,

      // list items might have multiple paragraphs; only do this at the first one
      isFirstChildOfParent,
      canOutdent,
    ],
    baseCommand.chainCommands(deletePreviousEmptyListItem, outdentList()),
  ),

  // if we're just inside a paragraph node (or gapcursor is shown) and backspace, then try to join
  // the text to the previous list item, if one exists
  filter(
    [isEmptySelectionAtStart, canToJoinToPreviousListItem],
    joinToPreviousListItem,
  ),
);

/**
 * Implemetation taken and modified for our needs from PM
 * @param itemType Node
 * Splits the list items, specific implementation take from PM
 */
function splitListItem(itemType: NodeType): Command {
  return function (state, dispatch) {
    const ref = state.selection as NodeSelection;
    const { $from } = ref;
    const { $to } = ref;
    const { node } = ref;
    if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
      return false;
    }
    const grandParent = $from.node(-1);
    if (grandParent.type !== itemType) {
      return false;
    }
    /** --> The following line changed from the original PM implementation to allow list additions with multiple paragraphs */
    if (
      (grandParent.content as any).content.length <= 1 &&
      $from.parent.content.size === 0 &&
      !(grandParent.content.size === 0)
    ) {
      // In an empty block. If this is a nested list, the wrapping
      // list item should be split. Otherwise, bail out and let next
      // command handle lifting.
      if (
        $from.depth === 2 ||
        $from.node(-3).type !== itemType ||
        $from.index(-2) !== $from.node(-2).childCount - 1
      ) {
        return false;
      }
      if (dispatch) {
        let wrap = Fragment.empty;
        const keepItem = $from.index(-1) > 0;
        // Build a fragment containing empty versions of the structure
        // from the outer list item to the parent node of the cursor
        for (
          let d = $from.depth - (keepItem ? 1 : 2);
          d >= $from.depth - 3;
          d--
        ) {
          wrap = Fragment.from($from.node(d).copy(wrap));
        }
        // Add a second list item with an empty default start node
        wrap = wrap.append(Fragment.from(itemType.createAndFill()));
        const tr$1 = state.tr.replace(
          $from.before(keepItem ? undefined : -1),
          $from.after(-3),
          new Slice(wrap, keepItem ? 3 : 2, 2),
        );
        tr$1.setSelection(
          (state.selection.constructor as any).near(
            tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2)),
          ),
        );
        dispatch(tr$1.scrollIntoView());
      }
      return true;
    }
    const nextType =
      $to.pos === $from.end()
        ? grandParent.contentMatchAt(0).defaultType
        : undefined;
    const tr = state.tr.delete($from.pos, $to.pos);
    const types = nextType && [undefined, { type: nextType }];

    if (dispatch) {
      dispatch(tr.split($from.pos, 2, types as any).scrollIntoView());
    }
    return true;
  };
}

/**
 * Merge closest bullet list blocks into one
 *
 * @param {NodeType} listItem
 * @param {NodeRange} range
 * @returns
 */
function mergeLists(listItem: NodeType, range: NodeRange) {
  return (command: Command): Command =>
    (state, dispatch) =>
      command(state, (tr) => {
        /* we now need to handle the case that we lifted a sublist out,
         * and any listItems at the current level get shifted out to
         * their own new list; e.g.:
         *
         * unorderedList
         *  listItem(A)
         *  listItem
         *    unorderedList
         *      listItem(B)
         *  listItem(C)
         *
         * becomes, after unindenting the first, top level listItem, A:
         *
         * content of A
         * unorderedList
         *  listItem(B)
         * unorderedList
         *  listItem(C)
         *
         * so, we try to merge these two lists if they're of the same type, to give:
         *
         * content of A
         * unorderedList
         *  listItem(B)
         *  listItem(C)
         */

        const $start: ResolvedPos = state.doc.resolve(range.start);
        const $end: ResolvedPos = state.doc.resolve(range.end);
        const $join = tr.doc.resolve(tr.mapping.map(range.end - 1));

        if (
          $join.nodeBefore &&
          $join.nodeAfter &&
          $join.nodeBefore.type === $join.nodeAfter.type
        ) {
          if (
            $end.nodeAfter &&
            $end.nodeAfter.type === listItem &&
            $end.parent.type === $start.parent.type
          ) {
            tr.join($join.pos);
          }
        }

        if (dispatch) {
          dispatch(tr.scrollIntoView());
        }
      });
}

export function outdentList(): Command {
  return function (state, dispatch) {
    const { listItem } = state.schema.nodes;
    const { $from, $to } = state.selection;
    if (isInsideListItem(state)) {
      // if we're backspacing at the start of a list item, unindent it
      // take the the range of nodes we might be lifting

      // the predicate is for when you're backspacing a top level list item:
      // we don't want to go up past the doc node, otherwise the range
      // to clear will include everything
      const range = $from.blockRange(
        $to,
        (node) => node.childCount > 0 && node.firstChild.type === listItem,
      );

      if (!range) {
        return false;
      }

      return compose(
        mergeLists(listItem, range), // 2. Check if I need to merge nearest list
        baseListCommand.liftListItem, // 1. First lift list item
      )(listItem)(state, dispatch);
    }

    return false;
  };
}

/**
 * Check if we can sink the list.
 *
 * @param {number} initialIndentationLevel
 * @param {EditorState} state
 * @returns {boolean} - true if we can sink the list
 *                    - false if we reach the max indentation level
 */
function canSink(initialIndentationLevel: number, state: EditorState): boolean {
  /*
      - Keep going forward in document until indentation of the node is < than the initial
      - If indentation is EVER > max indentation, return true and don't sink the list
      */
  let currentIndentationLevel: number;
  let currentPos = state.tr.selection.$to.pos;
  do {
    const resolvedPos = state.doc.resolve(currentPos);
    currentIndentationLevel = numberNestedLists(
      resolvedPos,
      state.schema.nodes,
    );
    if (currentIndentationLevel > maxIndentation) {
      // Cancel sink list.
      // If current indentation less than the initial, it won't be
      // larger than the max, and the loop will terminate at end of this iteration
      return false;
    }
    currentPos++;
  } while (currentIndentationLevel >= initialIndentationLevel);

  return true;
}

export function indentList(): Command {
  return function (state, dispatch) {
    const { listItem } = state.schema.nodes;
    if (isInsideListItem(state)) {
      // Record initial list indentation
      const initialIndentationLevel = numberNestedLists(
        state.selection.$from,
        state.schema.nodes,
      );

      if (canSink(initialIndentationLevel, state)) {
        compose(baseListCommand.sinkListItem)(listItem)(state, dispatch);
      }
      return true;
    }
    return false;
  };
}

export function liftListItems(): Command {
  return function (state, dispatch) {
    const { tr } = state;
    const { $from, $to } = state.selection;

    tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
      // isTextblock is true for paragraph, heading, codeBlock.
      if (node.isTextblock) {
        const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
        const range = sel.$from.blockRange(sel.$to);

        if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
          return false;
        }

        const target = range && liftTarget(range);

        if (target === undefined || target === null) {
          return false;
        }

        tr.lift(range, target);
      }
      return undefined;
    });

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  };
}

/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it's possible for a selection to start or end at an empty node at the very end of
 * a line. This isn't obvious by looking at the editor and it's likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
export function adjustSelectionInList(
  doc: Node,
  selection: TextSelection,
): TextSelection {
  const { $from, $to } = selection;

  const isSameLine = $from.pos === $to.pos;

  let startPos = $from.pos;
  const endPos = $to.pos;

  if (isSameLine && startPos === doc.nodeSize - 3) {
    // Line is empty, don't do anything
    return selection;
  }

  // Selection started at the very beginning of a line and therefor points to the previous line.
  if ($from.nodeBefore && !isSameLine) {
    startPos++;
    let node = doc.nodeAt(startPos);
    while (!node || (node && !node.isText)) {
      startPos++;
      node = doc.nodeAt(startPos);
    }
  }

  if (endPos === startPos) {
    return new TextSelection(doc.resolve(startPos));
  }

  return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
}

// Get the depth of the nearest ancestor list
export const rootListDepth = (
  pos: ResolvedPos,
  nodes: Record<string, NodeType>,
) => {
  const { bulletList, orderedList, listItem } = nodes;
  let depth;
  for (let i = pos.depth - 1; i > 0; i--) {
    const node = pos.node(i);
    if (node.type === bulletList || node.type === orderedList) {
      depth = i;
    }
    if (
      node.type !== bulletList &&
      node.type !== orderedList &&
      node.type !== listItem
    ) {
      break;
    }
  }
  return depth;
};

/**
 * Check of is selection is inside a list of the specified type
 * @param state
 * @param listType
 */
function isInsideList(
  state: EditorState,
  listType: 'bulletList' | 'orderedList',
) {
  const { $from } = state.selection;
  const parent = $from.node(-2);
  const grandgrandParent = $from.node(-3);

  return (
    (parent && parent.type === state.schema.nodes[listType]) ||
    (grandgrandParent && grandgrandParent.type === state.schema.nodes[listType])
  );
}

export function wrapInList(nodeType: NodeType): Command {
  return baseCommand.autoJoin(
    baseListCommand.wrapInList(nodeType),
    (before, after) => before.type === after.type && before.type === nodeType,
  );
}

// Returns the number of nested lists that are ancestors of the given selection
export const numberNestedLists = (
  resolvedPos: ResolvedPos,
  nodes: Record<string, NodeType>,
) => {
  const { bulletList, orderedList } = nodes;
  let count = 0;
  for (let i = resolvedPos.depth - 1; i > 0; i--) {
    const node = resolvedPos.node(i);
    if (node.type === bulletList || node.type === orderedList) {
      count += 1;
    }
  }
  return count;
};

export function toggleListCommand(
  listType: 'bulletList' | 'orderedList',
): Command {
  return function (state, dispatch, view) {
    if (dispatch) {
      dispatch(
        state.tr.setSelection(
          adjustSelectionInList(state.doc, state.selection as TextSelection),
        ),
      );
    }

    if (!view) {
      return false;
    }

    state = view.state;

    const {
      doc,
      selection: { $from, $to },
    } = state;
    const listNodeType = state.schema.nodes[listType];

    // find closest parent of listNodeType from start of selection
    const listParentPos = findParentNodeOfTypeClosestToPos(
      doc.resolve($from.pos),
      listNodeType,
    );
    // determine if end of selection is outside of that list (if selection is in a list at all)
    const isSameListTypeSelected =
      listParentPos &&
      $to.pos <= listParentPos.pos + listParentPos.node.nodeSize;

    if (isInsideList(state, listType) && isSameListTypeSelected) {
      // Untoggles list
      return liftListItems()(state, dispatch);
    }
    // Converts list type e.g. bullet_list -> ordered_list if needed
    if (!isSameListTypeSelected) {
      liftListItems()(state, dispatch);
      state = view.state;
    }

    // Remove any invalid marks that are not supported
    const tr = sanitiseSelectionMarksForWrapping(state, listNodeType);
    if (tr && dispatch) {
      dispatch(tr);
      state = view.state;
    }
    // Wraps selection in list
    return wrapInList(listNodeType)(state, dispatch);
  };
}

export const toggleList = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView,
  listType: 'bulletList' | 'orderedList',
): boolean => {
  const { selection } = state;
  const fromNode = selection.$from.node(selection.$from.depth - 2);
  const endNode = selection.$to.node(selection.$to.depth - 2);
  if (
    !fromNode ||
    fromNode.type.name !== listType ||
    !endNode ||
    endNode.type.name !== listType
  ) {
    return toggleListCommand(listType)(state, dispatch, view);
  }
  const depth = rootListDepth(selection.$to, state.schema.nodes);
  let tr = liftFollowingList(
    state,
    selection.$to.pos,
    selection.$to.end(depth),
    depth || 0,
    state.tr,
  );
  tr = liftSelectionList(state, tr);
  dispatch(tr);
  return true;
};

export function toggleBulletList(view: EditorView) {
  return toggleList(view.state, view.dispatch, view, 'bulletList');
}

export function toggleOrderedList(view: EditorView) {
  return toggleList(view.state, view.dispatch, view, 'orderedList');
}
