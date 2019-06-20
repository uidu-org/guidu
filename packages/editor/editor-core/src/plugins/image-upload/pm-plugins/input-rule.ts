import { inputRules } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { createExternalMediaNode } from '../utils';

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  if (!schema.nodes.media || !schema.nodes.mediaSingle) {
    return undefined;
  }

  // ![something](link) should convert to an image
  const imageRule = createInputRule(
    /!\[(.*)\]\((\S+)\)$/,
    (state, match, start, end) => {
      const { schema } = state;
      const attrs = {
        src: match[2],
        alt: match[1],
      };

      const node = createExternalMediaNode(attrs.src, schema);
      if (node) {
        analyticsService.trackEvent('atlassian.editor.image.autoformatting');
        return state.tr.replaceWith(start, end, node);
      }

      return null;
    },
  );

  return inputRules({
    rules: [imageRule],
  });
}

export default inputRulePlugin;
