import { BlockCardDefinition, CardAttributes } from '@uidu/adf-schema';

export const blockCard = (attrs: CardAttributes): BlockCardDefinition => ({
  type: 'blockCard',
  attrs,
});
