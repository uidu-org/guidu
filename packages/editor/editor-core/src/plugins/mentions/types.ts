import {
  MentionDescription,
  MentionProvider,
  TeamMentionProvider,
} from '@uidu/mentions';

export interface MentionPluginOptions {
  sanitizePrivateContent?: boolean;
  mentionInsertDisplayName?: boolean;
  useInlineWrapper?: boolean;
  allowZeroWidthSpaceAfter?: boolean;
}

export type MentionPluginState = {
  mentionProvider?: MentionProvider | TeamMentionProvider;
  mentions?: Array<MentionDescription>;
};
