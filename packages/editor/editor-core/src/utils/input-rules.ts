import { InputRule } from 'prosemirror-inputrules';
import { Mark as PMMark } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

export type InputRuleWithHandler = InputRule & { handler: InputRuleHandler };

export type InputRuleHandler = (
  state: EditorState,
  match: Array<string>,
  start: number,
  end: number,
) => Transaction | null;

export function defaultInputRuleHandler(
  inputRule: InputRuleWithHandler,
  isBlockNodeRule: boolean = false,
): InputRuleWithHandler {
  const originalHandler = (inputRule as any).handler;
  inputRule.handler = (state: EditorState, match, start, end) => {
    // Skip any input rule inside code
    // https://product-fabric.atlassian.net/wiki/spaces/E/pages/37945345/Editor+content+feature+rules#Editorcontent/featurerules-Rawtextblocks
    const unsupportedMarks = isBlockNodeRule
      ? hasUnsupportedMarkForBlockInputRule(state, start, end)
      : hasUnsupportedMarkForInputRule(state, start, end);

    if (state.selection.$from.parent.type.spec.code || unsupportedMarks) {
      return;
    }

    return originalHandler(state, match, start, end);
  };

  return inputRule;
}

export function createInputRule(
  match: RegExp,
  handler: InputRuleHandler,
  isBlockNodeRule: boolean = false,
): InputRuleWithHandler {
  return defaultInputRuleHandler(
    new InputRule(match, handler) as InputRuleWithHandler,
    isBlockNodeRule,
  );
}

// ProseMirror uses the Unicode Character 'OBJECT REPLACEMENT CHARACTER' (U+FFFC) as text representation for
// leaf nodes, i.e. nodes that don't have any content or text property (e.g. hardBreak, emoji, mention, rule)
// It was introduced because of https://github.com/ProseMirror/prosemirror/issues/262
// This can be used in an input rule regex to be able to include or exclude such nodes.
export const leafNodeReplacementCharacter = '\ufffc';

const hasUnsupportedMarkForBlockInputRule = (
  state: EditorState,
  start: number,
  end: number,
) => {
  const {
    doc,
    schema: { marks },
  } = state;
  let unsupportedMarksPresent = false;
  const isUnsupportedMark = (node: PMMark) =>
    node.type === marks.code ||
    node.type === marks.link ||
    node.type === marks.typeAheadQuery;
  doc.nodesBetween(start, end, (node) => {
    unsupportedMarksPresent =
      unsupportedMarksPresent ||
      node.marks.filter(isUnsupportedMark).length > 0;
  });
  return unsupportedMarksPresent;
};

const hasUnsupportedMarkForInputRule = (
  state: EditorState,
  start: number,
  end: number,
) => {
  const {
    doc,
    schema: { marks },
  } = state;
  let unsupportedMarksPresent = false;
  const isCodemark = (mark: PMMark) => mark.type === marks.code;
  doc.nodesBetween(start, end, (node) => {
    unsupportedMarksPresent =
      unsupportedMarksPresent || node.marks.filter(isCodemark).length > 0;
  });
  return unsupportedMarksPresent;
};
