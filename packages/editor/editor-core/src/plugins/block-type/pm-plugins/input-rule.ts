import { safeInsert } from '@uidu/prosemirror-utils';
import {
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import {
  createInputRule,
  defaultInputRuleHandler,
  InputRuleWithHandler,
  instrumentedInputRule,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
  ruleWithAnalytics,
} from '../../analytics';
import { insertBlock } from '../commands/insert-block';
import {
  isConvertableToCodeBlock,
  transformToCodeBlockAction,
} from '../commands/transform-to-code-block';
import { HeadingLevelsAndNormalText } from '../types';

const MAX_HEADING_LEVEL = 6;

function getHeadingLevel(match: string[]): {
  level: HeadingLevelsAndNormalText;
} {
  return {
    level: match[1].length as HeadingLevelsAndNormalText,
  };
}

export function headingRule(nodeType: NodeType, maxLevel: number) {
  return textblockTypeInputRule(
    new RegExp(`^(#{1,${maxLevel}})\\s$`),
    nodeType,
    getHeadingLevel,
  ) as InputRuleWithHandler;
}

export function blockQuoteRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType) as InputRuleWithHandler;
}

export function codeBlockRule(nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}

/**
 * Get heading rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getHeadingRules(schema: Schema): InputRuleWithHandler[] {
  // '# ' for h1, '## ' for h2 and etc
  const hashRule = defaultInputRuleHandler(
    headingRule(schema.nodes.heading, MAX_HEADING_LEVEL),
    true,
  );

  const leftNodeReplacementHashRule = createInputRule(
    new RegExp(`${leafNodeReplacementCharacter}(#{1,6})\\s$`),
    (state, match, start, end) => {
      const level = match[1].length;
      return insertBlock(
        state,
        schema.nodes.heading,
        `heading${level}`,
        start,
        end,
        { level },
      );
    },
    true,
  );

  // Old analytics stuff
  const currentHandler = hashRule.handler;
  hashRule.handler = (state, match: string[], start: number, end: number) => {
    analyticsService.trackEvent(
      `uidu.editor-core.format.heading${match[1].length}.autoformatting`,
    );
    return currentHandler(state, match, start, end);
  };

  // New analytics handler
  const ruleWithHeadingAnalytics = ruleWithAnalytics(
    (_state, match: string[]) => ({
      action: ACTION.FORMATTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      eventType: EVENT_TYPE.TRACK,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
      attributes: {
        inputMethod: INPUT_METHOD.FORMATTING,
        newHeadingLevel: getHeadingLevel(match).level,
      },
    }),
  );

  return [
    ruleWithHeadingAnalytics(hashRule),
    ruleWithHeadingAnalytics(leftNodeReplacementHashRule),
  ];
}

/**
 * Get all block quote input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getBlockQuoteRules(schema: Schema): InputRuleWithHandler[] {
  // '> ' for blockquote
  const greatherThanRule = defaultInputRuleHandler(
    blockQuoteRule(schema.nodes.blockquote),
    true,
  );

  greatherThanRule.handler = trackAndInvoke(
    'uidu.editor-core.format.blockquote.autoformatting',
    greatherThanRule.handler,
  );

  const leftNodeReplacementGreatherRule = createInputRule(
    new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`),
    (state, _match, start, end) =>
      insertBlock(state, schema.nodes.blockquote, 'blockquote', start, end),
    true,
  );

  // Analytics V3 handler
  const ruleWithBlockQuoteAnalytics = ruleWithAnalytics(() => ({
    action: ACTION.FORMATTED,
    actionSubject: ACTION_SUBJECT.TEXT,
    eventType: EVENT_TYPE.TRACK,
    actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
    attributes: {
      inputMethod: INPUT_METHOD.FORMATTING,
    },
  }));

  return [
    ruleWithBlockQuoteAnalytics(greatherThanRule),
    ruleWithBlockQuoteAnalytics(leftNodeReplacementGreatherRule),
  ];
}

/**
 * Get all code block input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getCodeBlockRules(schema: Schema): InputRuleWithHandler[] {
  const analyticsPayload: AnalyticsEventPayload = {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.CODE_BLOCK,
    attributes: { inputMethod: INPUT_METHOD.FORMATTING },
    eventType: EVENT_TYPE.TRACK,
  };

  const threeTildeRule = createInputRule(
    /((^`{3,})|(\s`{3,}))(\S*)$/,
    (state, match, start, end) => {
      const attributes: any = {};
      if (match[4]) {
        attributes.language = match[4];
      }
      const newStart = match[0][0] === ' ' ? start + 1 : start;
      if (isConvertableToCodeBlock(state)) {
        analyticsService.trackEvent(
          `uidu.editor-core.format.codeblock.autoformatting`,
        );
        const tr = transformToCodeBlockAction(state, attributes)
          // remove markdown decorator ```
          .delete(newStart, end)
          .scrollIntoView();
        return addAnalytics(state, tr, analyticsPayload);
      }
      let { tr } = state;
      tr = tr.delete(newStart, end);
      const codeBlock = state.schema.nodes.codeBlock.createChecked();
      return safeInsert(codeBlock)(tr);
    },
    true,
  );

  const leftNodeReplacementThreeTildeRule = createInputRule(
    new RegExp(`((${leafNodeReplacementCharacter}\`{3,})|(\\s\`{3,}))(\\S*)$`),
    (state, match, start, end) => {
      const attributes: any = {};
      if (match[4]) {
        attributes.language = match[4];
      }
      let tr = insertBlock(
        state,
        schema.nodes.codeBlock,
        'codeblock',
        start,
        end,
        attributes,
      );
      if (tr) {
        tr = addAnalytics(state, tr, analyticsPayload);
      }
      return tr;
    },
    true,
  );

  return [threeTildeRule, leftNodeReplacementThreeTildeRule];
}

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: Array<InputRuleWithHandler> = [];

  if (schema.nodes.heading) {
    rules.push(...getHeadingRules(schema));
  }

  if (schema.nodes.blockquote) {
    rules.push(...getBlockQuoteRules(schema));
  }

  if (schema.nodes.codeBlock) {
    rules.push(...getCodeBlockRules(schema));
  }

  if (rules.length !== 0) {
    return instrumentedInputRule('block-type', { rules });
  }
  return undefined;
}

export default inputRulePlugin;
