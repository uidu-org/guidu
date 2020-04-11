import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import { ContextIdentifierProvider } from '@uidu/editor-common';
import {
  MentionDescription,
  MentionProvider,
  TeamMentionProvider,
} from '@uidu/mentions';

export interface TeamInfoAttrAnalytics {
  teamId: String;
  includesYou: boolean;
  memberCount: number;
}

export interface MentionPluginOptions {
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  sanitizePrivateContent?: boolean;
  mentionInsertDisplayName?: boolean;
  useInlineWrapper?: boolean;
  allowZeroWidthSpaceAfter?: boolean;
}

export type MentionPluginState = {
  mentionProvider?: MentionProvider | TeamMentionProvider;
  contextIdentifierProvider?: ContextIdentifierProvider;
  mentions?: Array<MentionDescription>;
};
