import { inputRules } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { analyticsService } from '../../../analytics';
import {
  createInputRule,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
import { TypeAheadHandler } from '../types';
import {
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from './main';

export function inputRulePlugin(
  schema: Schema,
  typeAheads: TypeAheadHandler[],
): Plugin | undefined {
  const triggersRegex = typeAheads
    .map(t => t.customRegex || t.trigger)
    .join('|');

  if (!triggersRegex.length) {
    return undefined;
  }

  const regex = new RegExp(
    `(^|[.!?\\s${leafNodeReplacementCharacter}])(${triggersRegex})$`,
  );

  const typeAheadInputRule = createInputRule(regex, (state, match) => {
    const typeAheadState = typeAheadPluginKey.getState(
      state,
    ) as TypeAheadPluginState;

    /**
     * Why using match 2 and 3?  Regex:
     * (allowed characters before trigger)(joined|triggers|(sub capture groups))
     *            match[1]                     match[2]          match[3] – optional
     */
    const trigger = match[3] || match[2];

    if (!typeAheadState.isAllowed || !trigger) {
      return null;
    }

    const mark = schema.mark('typeAheadQuery', { trigger });
    const { tr, selection } = state;
    const marks = selection.$from.marks();

    analyticsService.trackEvent('atlassian.editor.typeahead.trigger', {
      trigger,
    });

    return tr.replaceSelectionWith(
      schema.text(trigger, [mark, ...marks]),
      false,
    );
  });

  return inputRules({ rules: [typeAheadInputRule] });
}

export default inputRulePlugin;
