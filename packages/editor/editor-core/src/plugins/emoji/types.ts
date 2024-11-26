import { EmojiDescription, EmojiProvider } from '@uidu/emoji';

export interface EmojiPluginOptions {
  allowZeroWidthSpaceAfter?: boolean;
  useInlineWrapper?: boolean;
}

export type EmojiPluginState = {
  emojiProvider?: EmojiProvider;
  emojis?: Array<EmojiDescription>;
};
