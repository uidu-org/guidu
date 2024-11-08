import { InputRule, inputRules } from 'prosemirror-inputrules';
import { Fragment, Schema } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import {
  createInputRule,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
import { safeInsert } from '../../../utils/insert';

export const createHorizontalRule = (
  state: EditorState,
  start: number,
  end: number,
) => {
  if (!state.selection.empty) {
    return null;
  }

  let tr: Transaction<any> | null = null;
  /**
   * This is a workaround to get rid of the typeahead text when using quick insert
   * Once we insert *nothing*, we get a new transaction, so we can use the new selection
   * without considering the extra text after the `/` command.
   **/
  tr = state.tr.replaceWith(start, end, Fragment.empty);

  tr = safeInsert(
    state.schema.nodes.rule.createChecked(),
    tr.selection.from,
  )(tr);

  if (!tr) {
    const { $from } = state.selection;
    const $afterRule = state.doc.resolve($from.after());
    const { paragraph } = state.schema.nodes;

    if ($afterRule.nodeAfter && $afterRule.nodeAfter.type === paragraph) {
      // if there's already a paragraph after, just insert the rule into
      // the current paragraph
      end = end + 1;
    }

    tr = state.tr.replaceWith(
      start,
      end,
      Fragment.from(state.schema.nodes.rule.createChecked()),
    );
  }

  return tr;
};

const createHorizontalRuleAutoformat = (
  state: EditorState,
  start: number,
  end: number,
) => {
  return createHorizontalRule(state, start, end);
};

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.rule) {
    // '---' and '***' for hr
    rules.push(
      // -1, so that it also replaces the container paragraph
      createInputRule(
        /^(\-\-\-|\*\*\*)$/,
        (state, _match, start, end) =>
          createHorizontalRuleAutoformat(state, start - 1, end),
        true,
      ),
    );

    // '---' and '***' after shift+enter for hr
    rules.push(
      createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}(\\-\\-\\-|\\*\\*\\*)`),
        (state, _match, start, end) => {
          const { hardBreak } = state.schema.nodes;
          if (state.doc.resolve(start).nodeAfter!.type !== hardBreak) {
            return null;
          }
          return createHorizontalRuleAutoformat(state, start, end);
        },
        true,
      ),
    );
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }

  return undefined;
}

export default inputRulePlugin;
