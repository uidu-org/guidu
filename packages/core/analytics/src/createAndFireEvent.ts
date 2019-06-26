import { AnalyticsEventPayload } from './types';
import { CreateUIAnalyticsEvent } from './withAnalyticsEvents';

export default (channel?: string) => (payload: AnalyticsEventPayload) => (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const consumerEvent = createAnalyticsEvent(payload);
  consumerEvent.clone().fire(channel);
  return consumerEvent;
};
