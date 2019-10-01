import { PanelDefinition, PanelAttributes } from '@uidu/adf-schema';

export const panel = (attrs: PanelAttributes) => (
  ...content: PanelDefinition['content']
): PanelDefinition => ({
  type: 'panel',
  attrs,
  content,
});
