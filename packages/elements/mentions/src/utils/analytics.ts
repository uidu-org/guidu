import { UIAnalyticsEvent, WithAnalyticsEventsProps } from '@uidu/analytics';
import {
  GasPayload,
  OPERATIONAL_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@uidu/analytics-gas-types';
import { isSpecialMentionText } from '../types';
import pkg from '../version.json';
import { ELEMENTS_CHANNEL } from '../_constants';

export enum ComponentNames {
  TYPEAHEAD = 'mentionTypeahead',
  MENTION = 'mention',
  TEAM_MENTION_HIGHLIGHT = 'teamMentionHighlight',
}

export enum Actions {
  VIEWED = 'viewed',
  CLICKED = 'clicked',
  CLOSED = 'closed',
}

export const fireAnalyticsMentionTypeaheadEvent = (
  props: WithAnalyticsEventsProps,
) => (
  action: string,
  duration: number,
  userIds: string[] = [],
  query?: string,
): void => {
  if (props.createAnalyticsEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject: ComponentNames.TYPEAHEAD,
      attributes: {
        packageName: pkg.name,
        packageVersion: pkg.version,
        componentName: ComponentNames.MENTION,
        duration: Math.round(duration),
        userIds,
        queryLength: query ? query.length : 0,
      },
      eventType: OPERATIONAL_EVENT_TYPE,
    };
    const analyticsEvent: UIAnalyticsEvent = props.createAnalyticsEvent(
      eventPayload,
    );
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

export const fireAnalyticsTeamMentionHighlightEvent = (createEvent: any) => (
  actionSubject: string,
  action: string,
  source: string,
  actionSubjectId?: string,
  viewedCount?: number,
): void => {
  if (createEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject,
      actionSubjectId,
      eventType: UI_EVENT_TYPE,
      attributes: {
        source,
        packageName: pkg.name,
        packageVersion: pkg.version,
        componentName: ComponentNames.TEAM_MENTION_HIGHLIGHT,
        viewedCount,
      },
    };
    const analyticsEvent: UIAnalyticsEvent = createEvent(eventPayload);
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

export const fireAnalyticsMentionEvent = (
  createEvent: any, // CreateUIAnalyticsEvent,
) => (
  actionSubject: string,
  action: string,
  text: string,
  id: string,
  accessLevel?: string,
): UIAnalyticsEvent => {
  const payload: GasPayload = {
    action,
    actionSubject,
    eventType: UI_EVENT_TYPE,
    attributes: {
      packageName: pkg.name,
      packageVersion: pkg.version,
      componentName: ComponentNames.MENTION,
      accessLevel,
      isSpecial: isSpecialMentionText(text),
      userId: id,
    },
  };
  const event = createEvent(payload);
  event.fire(ELEMENTS_CHANNEL);
  return event;
};

export const fireAnalyticsMentionHydrationEvent = (
  props: WithAnalyticsEventsProps,
) => (
  action: string,
  userId: string,
  fromCache: boolean,
  duration: number,
): void => {
  if (props.createAnalyticsEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject: ComponentNames.MENTION,
      actionSubjectId: 'hydration',
      attributes: {
        packageName: pkg.name,
        packageVersion: pkg.version,
        componentName: ComponentNames.MENTION,
        userId,
        fromCache,
        duration: Math.round(duration),
      },
      eventType: OPERATIONAL_EVENT_TYPE,
    };
    const analyticsEvent: UIAnalyticsEvent = props.createAnalyticsEvent(
      eventPayload,
    );
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

// OLD Analytics
const MENTION_ANALYTICS_PREFIX = 'atlassian.fabric.mention';

export const fireAnalytics = (firePrivateAnalyticsEvent?: Function) => (
  eventName: string,
  text: string,
  accessLevel?: string,
) => {
  if (firePrivateAnalyticsEvent) {
    firePrivateAnalyticsEvent(`${MENTION_ANALYTICS_PREFIX}.${eventName}`, {
      accessLevel,
      isSpecial: isSpecialMentionText(text),
    });
  }
};
