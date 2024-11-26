import { InputRule, inputRules } from 'prosemirror-inputrules';
import { Plugin, Selection, Transaction } from 'prosemirror-state';
import {
  createInputRule,
  InputRuleHandler,
  InputRuleWithHandler,
} from '../../../utils/input-rules';

/**
 * Creates an InputRuleHandler that will match on a regular expression of the
 * form `(prefix, content, suffix?)`, and replace it with some given text,
 * maintaining prefix and suffix around the replacement.
 *
 * @param text text to replace with
 */
function replaceTextUsingCaptureGroup(text: string): InputRuleHandler {
  return (state, match, start, end): Transaction => {
    const [, prefix, , suffix] = match;
    const replacement = (prefix || '') + text + (suffix || '');

    let {
      tr,
      selection: { $to },
    } = state;
    tr.replaceWith(start, end, state.schema.text(replacement, $to.marks()));
    tr.setSelection(Selection.near(tr.doc.resolve(tr.selection.to)));
    return tr;
  };
}

function createReplacementRule(to: string, from: RegExp): InputRuleWithHandler {
  return createInputRule(from, replaceTextUsingCaptureGroup(to));
}

/**
 * Create replacement rules fiven a replacement map
 * @param replMap - Replacement map
 */
function createReplacementRules(replMap: {
  [replacement: string]: RegExp;
}): Array<InputRule> {
  return Object.keys(replMap).map((replacement) => {
    const regex = replMap[replacement];
    const rule = createReplacementRule(replacement, regex);

    return rule;
  });
}

// We don't agressively upgrade single quotes to smart quotes because
// they may clash with an emoji. Only do that when we have a matching
// single quote, or a contraction.
function createSingleQuotesRules(): Array<InputRuleWithHandler> {
  return [
    // wrapped text
    createInputRule(
      /(\s+|^)'(\S+.*\S+)'$/,
      (state, match, start, end): Transaction => {
        const [, spacing, innerContent] = match;
        const replacement = spacing + '‘' + innerContent + '’';

        return state.tr.insertText(replacement, start, end);
      },
    ),

    // apostrophe
    createReplacementRule('’', /(\w+)(')(\w+)$/),
  ];
}
/**
 * Get replacement rules related to product
 */
function getProductRules(): Array<InputRule> {
  return createReplacementRules({
    Atlassian: /(\s+|^)(atlassian)(\s)$/,
    Jira: /(\s+|^)(jira|JIRA)(\s)$/,
    Bitbucket: /(\s+|^)(bitbucket|BitBucket)(\s)$/,
    Hipchat: /(\s+|^)(hipchat|HipChat)(\s)$/,
    Trello: /(\s+|^)(trello)(\s)$/,
  });
}

/**
 * Get replacement rules related to symbol
 */
function getSymbolRules() {
  return createReplacementRules({
    '→': /(\s+|^)(--?>)(\s)$/,
    '←': /(\s+|^)(<--?)(\s)$/,
    '↔︎': /(\s+|^)(<->?)(\s)$/,
  });
}

/**
 * Get replacement rules related to punctuation
 */
function getPunctuationRules() {
  const dashEllipsisRules = createReplacementRules({
    '–': /(\s+|^)(--)(\s)$/,
    '…': /()(\.\.\.)$/,
  });

  const doubleQuoteRules = createReplacementRules({
    '“': /((?:^|[\s\{\[\(\<'"\u2018\u201C]))(")$/,
    '”': /"$/,
  });

  const singleQuoteRules = createSingleQuotesRules();

  return [
    ...dashEllipsisRules,
    ...doubleQuoteRules,
    ...singleQuoteRules.map((rule) => rule),
  ];
}

export default inputRules({
  rules: [...getProductRules(), ...getSymbolRules(), ...getPunctuationRules()],
}) as Plugin;
