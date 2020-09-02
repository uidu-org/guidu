import { CreateUIAnalyticsEvent, UIAnalyticsEvent } from '@uidu/analytics';
import pkg from '../version.json';

export const ELEMENTS_CHANNEL = 'fabric-elements';

type EventPayload = {
  action: string;
  actionSubject: string;
  attributes?: {
    [key: string]: any;
  };
};

export const createStatusAnalyticsAndFire = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => (payload: EventPayload): UIAnalyticsEvent => {
  const statusPayload = { ...payload, eventType: 'ui' };
  if (!statusPayload.attributes) {
    statusPayload.attributes = {};
  }
  statusPayload.attributes.packageName = pkg.name;
  statusPayload.attributes.packageVersion = pkg.version;
  statusPayload.attributes.componentName = 'status';

  const event = createAnalyticsEvent(statusPayload);
  event.fire(ELEMENTS_CHANNEL);
  return event;
};
