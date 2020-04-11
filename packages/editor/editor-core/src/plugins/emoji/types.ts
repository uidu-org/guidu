import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import { EmojiDescription, EmojiProvider } from '@uidu/emoji';

export interface EmojiPluginOptions {
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  allowZeroWidthSpaceAfter?: boolean;
  useInlineWrapper?: boolean;
}

export type EmojiPluginState = {
  emojiProvider?: EmojiProvider;
  emojis?: Array<EmojiDescription>;
};
