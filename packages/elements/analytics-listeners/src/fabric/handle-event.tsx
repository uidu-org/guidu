import { sendEvent } from '../analytics-web-client-wrapper';
import { AnalyticsWebClient } from '../types';
import Logger from '../helpers/logger';
import { processEventPayload } from './process-event-payload';
import { UIAnalyticsEvent } from '@uidu/analytics';

export const handleEvent = (
  event: UIAnalyticsEvent,
  tag: string,
  logger: Logger,
  client?: AnalyticsWebClient | Promise<AnalyticsWebClient>,
) => {
  if (!event.payload) {
    return;
  }
  const payload = processEventPayload(event, tag);
  sendEvent(logger, client)(payload);
};
