import { CardAttributes, InlineCardDefinition } from '@uidu/adf-schema';

export const inlineCard = (attrs: CardAttributes): InlineCardDefinition => ({
  type: 'inlineCard',
  attrs,
});
