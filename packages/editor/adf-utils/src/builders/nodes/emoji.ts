import { EmojiAttributes, EmojiDefinition } from '@uidu/adf-schema';

export const emoji = (attrs: EmojiAttributes): EmojiDefinition => ({
  type: 'emoji',
  attrs,
});
