import { InputRule } from 'prosemirror-inputrules';
import { Plugin, Selection, Transaction } from 'prosemirror-state';
import {
  createInputRule,
  InputRuleHandler,
  InputRuleWithHandler,
  instrumentedInputRule,
} from '../../../utils/input-rules';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  PUNC,
  ruleWithAnalytics,
  SYMBOL,
} from '../../analytics';

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
 * @param trackingEventName - Analytics V2 tracking event name
 * @param replacementRuleWithAnalytics - Analytics GAS V3 middleware for replacement and rules.
 */
function createReplacementRules(
  replMap: { [replacement: string]: RegExp },
  replacementRuleWithAnalytics?: (
    replacement: string,
  ) => (rule: InputRuleWithHandler) => InputRuleWithHandler,
): Array<InputRule> {
  return Object.keys(replMap).map((replacement) => {
    const regex = replMap[replacement];
    const rule = createReplacementRule(replacement, regex);

    if (replacementRuleWithAnalytics) {
      return replacementRuleWithAnalytics(replacement)(rule);
    }

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
  const productRuleWithAnalytics = (product: string) =>
    ruleWithAnalytics((_state, match) => ({
      action: ACTION.SUBSTITUTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      actionSubjectId: ACTION_SUBJECT_ID.PRODUCT_NAME,
      eventType: EVENT_TYPE.TRACK,
      attributes: {
        product,
        originalSpelling: match[2],
      },
    }));

  return createReplacementRules(
    {
      Atlassian: /(\s+|^)(atlassian)(\s)$/,
      Jira: /(\s+|^)(jira|JIRA)(\s)$/,
      Bitbucket: /(\s+|^)(bitbucket|BitBucket)(\s)$/,
      Hipchat: /(\s+|^)(hipchat|HipChat)(\s)$/,
      Trello: /(\s+|^)(trello)(\s)$/,
    },
    productRuleWithAnalytics,
  );
}

/**
 * Get replacement rules related to symbol
 */
function getSymbolRules() {
  const symbolToString: {
    [s: string]: SYMBOL.ARROW_RIGHT | SYMBOL.ARROW_LEFT | SYMBOL.ARROW_DOUBLE;
  } = {
    '→': SYMBOL.ARROW_RIGHT,
    '←': SYMBOL.ARROW_LEFT,
    '↔︎': SYMBOL.ARROW_DOUBLE,
  };
  const symbolRuleWithAnalytics = (symbol: string) =>
    ruleWithAnalytics(() => ({
      action: ACTION.SUBSTITUTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      actionSubjectId: ACTION_SUBJECT_ID.SYMBOL,
      eventType: EVENT_TYPE.TRACK,
      attributes: {
        symbol: symbolToString[symbol],
      },
    }));

  return createReplacementRules(
    {
      '→': /(\s+|^)(--?>)(\s)$/,
      '←': /(\s+|^)(<--?)(\s)$/,
      '↔︎': /(\s+|^)(<->?)(\s)$/,
    },
    symbolRuleWithAnalytics,
  );
}

/**
 * Get replacement rules related to punctuation
 */
function getPunctuationRules() {
  const punctuationToString: {
    [s: string]:
      | PUNC.DASH
      | PUNC.ELLIPSIS
      | PUNC.QUOTE_DOUBLE
      | PUNC.QUOTE_SINGLE;
  } = {
    '–': PUNC.DASH,
    '…': PUNC.ELLIPSIS,
    '“': PUNC.QUOTE_DOUBLE,
    '”': PUNC.QUOTE_DOUBLE,
    [PUNC.QUOTE_SINGLE]: PUNC.QUOTE_SINGLE,
  };
  const punctuationRuleWithAnalytics = (punctuation: string) =>
    ruleWithAnalytics(() => ({
      action: ACTION.SUBSTITUTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      actionSubjectId: ACTION_SUBJECT_ID.PUNC,
      eventType: EVENT_TYPE.TRACK,
      attributes: {
        punctuation: punctuationToString[punctuation],
      },
    }));

  const dashEllipsisRules = createReplacementRules(
    {
      '–': /(\s+|^)(--)(\s)$/,
      '…': /()(\.\.\.)$/,
    },
    punctuationRuleWithAnalytics,
  );

  const doubleQuoteRules = createReplacementRules(
    {
      '“': /((?:^|[\s\{\[\(\<'"\u2018\u201C]))(")$/,
      '”': /"$/,
    },
    punctuationRuleWithAnalytics,
  );

  const singleQuoteRules = createSingleQuotesRules();

  return [
    ...dashEllipsisRules,
    ...doubleQuoteRules,
    ...singleQuoteRules.map((rule) =>
      punctuationRuleWithAnalytics(PUNC.QUOTE_SINGLE)(rule),
    ),
  ];
}

export default instrumentedInputRule('text-formatting:smart-input', {
  rules: [...getProductRules(), ...getSymbolRules(), ...getPunctuationRules()],
}) as Plugin;
