import { InlineCardDefinition, CardAttributes } from '@uidu/adf-schema';

export const inlineCard = (attrs: CardAttributes): InlineCardDefinition => ({
  type: 'inlineCard',
  attrs,
});
