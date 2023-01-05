import { CreateUIAnalyticsEvent } from '@uidu/analytics';
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
  mentions?: Array<MentionDescription>;
};
