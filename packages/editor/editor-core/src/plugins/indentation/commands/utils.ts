import { IndentationMarkAttributes } from '@uidu/adf-schema';
import { INDENT_DIR, INDENT_TYPE } from '../../analytics';

export type PrevAttributes = IndentationMarkAttributes | undefined;
export type NewAttributes = IndentationMarkAttributes | undefined | false;
export type IndentationChangesOptions = {
  direction: INDENT_DIR;
};

const indentTypes: Record<string, string> = {
  paragraph: INDENT_TYPE.PARAGRAPH,
  heading: INDENT_TYPE.HEADING,
};

/**
 * Get the previous indentation level  prev attributes
 * @param prevAttrs - Previous attributes from indentation
 */
export function getPrevIndentLevel(prevAttrs: PrevAttributes): number {
  if (prevAttrs === undefined) {
    return 0;
  }
  return prevAttrs.level;
}

/**
 * Get the current indentation level given prev and new attributes
 * @param prevAttrs - Previous attributes from indentation
 * @param newAttrs - New attributes from indentation
 */
export function getNewIndentLevel(
  prevAttrs: PrevAttributes,
  newAttrs: NewAttributes,
): number {
  if (newAttrs === undefined) {
    return getPrevIndentLevel(prevAttrs);
  }
  if (newAttrs === false) {
    return 0;
  }
  return newAttrs.level;
}
