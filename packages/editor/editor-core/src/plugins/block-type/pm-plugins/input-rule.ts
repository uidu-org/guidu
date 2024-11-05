import { safeInsert } from '@uidu/prosemirror-utils';
import {
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import {
  createInputRule,
  defaultInputRuleHandler,
  InputRuleWithHandler,
  instrumentedInputRule,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
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
  hashRule.handler = (state, match: string[], start: number, end: number) =>
    currentHandler(state, match, start, end);

  return [hashRule, leftNodeReplacementHashRule];
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

  const leftNodeReplacementGreatherRule = createInputRule(
    new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`),
    (state, _match, start, end) =>
      insertBlock(state, schema.nodes.blockquote, 'blockquote', start, end),
    true,
  );

  return [greatherThanRule, leftNodeReplacementGreatherRule];
}

/**
 * Get all code block input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getCodeBlockRules(schema: Schema): InputRuleWithHandler[] {
  const threeTildeRule = createInputRule(
    /((^`{3,})|(\s`{3,}))(\S*)$/,
    (state, match, start, end) => {
      const attributes: any = {};
      if (match[4]) {
        attributes.language = match[4];
      }
      const newStart = match[0][0] === ' ' ? start + 1 : start;
      if (isConvertableToCodeBlock(state)) {
        const tr = transformToCodeBlockAction(state, attributes)
          // remove markdown decorator ```
          .delete(newStart, end)
          .scrollIntoView();
        return tr;
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
      const tr = insertBlock(
        state,
        schema.nodes.codeBlock,
        'codeblock',
        start,
        end,
        attributes,
      );
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
