import { NodeType } from 'prosemirror-model';
import { Selection, TextSelection } from 'prosemirror-state';
import { findWrapping } from 'prosemirror-transform';
import { Command } from '../../../types';
import { removeBlockMarks } from '../../../utils/mark';
import {
  BLOCK_QUOTE,
  CODE_BLOCK,
  HeadingLevelsAndNormalText,
  HEADINGS_BY_NAME,
  NORMAL_TEXT,
  PANEL,
} from '../types';

export function setNormalText(): Command {
  return (state, dispatch) => {
    const {
      tr,
      selection: { $from, $to },
      schema,
    } = state;
    if (dispatch) {
      dispatch(tr.setBlockType($from.pos, $to.pos, schema.nodes.paragraph));
    }
    return true;
  };
}

export function setHeading(level: HeadingLevelsAndNormalText): Command {
  return (state, dispatch) => {
    const {
      tr,
      selection: { $from, $to },
      schema,
    } = state;
    if (dispatch) {
      dispatch(
        tr.setBlockType($from.pos, $to.pos, schema.nodes.heading, { level }),
      );
    }
    return true;
  };
}

export function setBlockType(name: string): Command {
  return (state, dispatch) => {
    const { nodes } = state.schema;
    if (name === NORMAL_TEXT.name && nodes.paragraph) {
      return setNormalText()(state, dispatch);
    }

    const headingBlockType = HEADINGS_BY_NAME[name];
    if (headingBlockType && nodes.heading && headingBlockType.level) {
      return setHeading(headingBlockType.level)(state, dispatch);
    }

    return false;
  };
}

/**
 * Function will add wrapping node.
 * 1. If currently selected blocks can be wrapped in the warpper type it will wrap them.
 * 2. If current block can not be wrapped inside wrapping block it will create a new block below selection,
 *  and set selection on it.
 */
function wrapSelectionIn(type: NodeType): Command {
  return (state, dispatch) => {
    let { tr } = state;
    const { $from, $to } = state.selection;
    const { paragraph } = state.schema.nodes;
    const { alignment, indentation } = state.schema.marks;

    /** Alignment or Indentation is not valid inside block types */
    const removeAlignTr = removeBlockMarks(state, [alignment, indentation]);
    tr = removeAlignTr || tr;

    const range = $from.blockRange($to);
    const wrapping = range && findWrapping(range, type);
    if (range && wrapping) {
      tr.wrap(range, wrapping).scrollIntoView();
    } else {
      /** We always want to append a block type */
      tr.replaceRangeWith(
        $to.pos + 1,
        $to.pos + 1,
        type.createAndFill({}, paragraph.create()),
      );
      tr.setSelection(Selection.near(tr.doc.resolve(state.selection.to + 1)));
    }
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

/**
 * Function will insert code block at current selection if block is empty or below current selection and set focus on it.
 */
function insertCodeBlock(): Command {
  return (state, dispatch) => {
    const { tr } = state;
    const { $to } = state.selection;
    const { codeBlock } = state.schema.nodes;

    const getNextNode = state.doc.nodeAt($to.pos + 1);
    const addPos = getNextNode && getNextNode.isText ? 0 : 1;

    /** We always want to append a block type */
    tr.replaceRangeWith(
      $to.pos + addPos,
      $to.pos + addPos,
      codeBlock.createAndFill(),
    );
    tr.setSelection(
      Selection.near(tr.doc.resolve(state.selection.to + addPos)),
    );
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

export const cleanUpAtTheStartOfDocument: Command = (state, dispatch) => {
  const { $cursor } = state.selection as TextSelection;
  if (
    $cursor &&
    !$cursor.nodeBefore &&
    !$cursor.nodeAfter &&
    $cursor.pos === 1
  ) {
    const { tr, schema } = state;
    const { paragraph } = schema.nodes;
    const { parent } = $cursor;

    /**
     * Use cases:
     * 1. Change `heading` to `paragraph`
     * 2. Remove block marks
     *
     * NOTE: We already know it's an empty doc so it's safe to use 0
     */
    tr.setNodeMarkup(0, paragraph, parent.attrs, []);
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }
  return false;
};

export function insertBlockType(name: string): Command {
  return (state, dispatch) => {
    const { nodes } = state.schema;

    switch (name) {
      case BLOCK_QUOTE.name:
        if (nodes.paragraph && nodes.blockquote) {
          return wrapSelectionIn(nodes.blockquote)(state, dispatch);
        }
        break;
      case CODE_BLOCK.name:
        if (nodes.codeBlock) {
          return insertCodeBlock()(state, dispatch);
        }
        break;
      case PANEL.name:
        if (nodes.panel && nodes.paragraph) {
          return wrapSelectionIn(nodes.panel)(state, dispatch);
        }
        break;
      default:
        return false;
    }

    return false;
  };
}
