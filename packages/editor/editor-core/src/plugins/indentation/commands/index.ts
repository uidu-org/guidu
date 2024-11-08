import { IndentationMarkAttributes } from '@uidu/adf-schema';
import { Node as PmNode, Schema } from 'prosemirror-model';
import { toggleBlockMark } from '../../../commands';
import { Command } from '../../../types/command';

const MAX_INDENTATION_LEVEL = 6;

const isIndentationAllowed = (schema: Schema, node: PmNode) => {
  const {
    nodes: { paragraph, heading },
    marks: { alignment },
  } = schema;

  if ([paragraph, heading].indexOf(node.type) > -1) {
    if (alignment) {
      const hasAlignment = node.marks.filter(
        (mark) => mark.type === alignment,
      )[0];
      return !hasAlignment;
    }
    return true;
  }
  return false;
};

/**
 * Create new indentation command (Either indent or outdent depend of getArgsFn)
 * @param getNewIndentationAttrs Function to handle new indentation level
 */
function createIndentationCommand(
  getNewIndentationAttrs: (
    prevArgs?: IndentationMarkAttributes,
    node?: PmNode,
  ) => IndentationMarkAttributes | undefined | false,
): Command {
  return (state, dispatch) => {
    const { indentation } = state.schema.marks;

    return toggleBlockMark<IndentationMarkAttributes>(
      indentation,
      getNewIndentationAttrs,
      isIndentationAllowed,
    )(state, dispatch);
  };
}

/**
 * Get new level for outdent
 * @param oldAttr Old attributes for the mark, undefined if the mark doesn't exit
 * @returns  - undefined; No change required
 *           - false; Remove the mark
 *           - object; Update attributes
 */
function getIndentAttrs(
  oldAttr?: IndentationMarkAttributes,
): IndentationMarkAttributes | undefined {
  if (!oldAttr) {
    return { level: 1 }; // No mark exist, create a new one with level 1
  }

  const { level } = oldAttr;
  if (level >= MAX_INDENTATION_LEVEL) {
    return undefined; // Max indentation level reached, do nothing.
  }
  return { level: level + 1 }; // Otherwise, increase the level by one
}

export const indent: Command = createIndentationCommand(getIndentAttrs);

/**
 * Get new level for outdent
 * @param oldAttr Old attributes for the mark, undefined if the mark doesn't exit
 * @returns  - undefined; No change required
 *           - false; Remove the mark
 *           - object; Update attributes
 */
const getOutdentAttrs = (
  oldAttr?: IndentationMarkAttributes,
): IndentationMarkAttributes | undefined | false => {
  if (!oldAttr) {
    return undefined; // Do nothing;
  }

  const { level } = oldAttr;
  if (level <= 1) {
    return false; // Remove the mark
  }

  return { level: level - 1 }; // Decrease the level on other cases
};

export const outdent: Command = createIndentationCommand(getOutdentAttrs);

export const removeIndentation: Command = (state, dispatch) =>
  toggleBlockMark(state.schema.marks.indentation, () => false)(state, dispatch);
