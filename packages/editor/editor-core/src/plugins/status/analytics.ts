import { AnalyticsEventPayload, CreateUIAnalyticsEvent } from '@uidu/analytics';
import pkg from '../../version.json';

export const FABRIC_CHANNEL = 'fabric-elements';

export const createStatusAnalyticsAndFire = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => (payload: AnalyticsEventPayload) => {
  if (createAnalyticsEvent && payload) {
    const statusPayload: AnalyticsEventPayload = {
      ...payload,
      eventType: 'ui',
    };
    if (!statusPayload.attributes) {
      statusPayload.attributes = {};
    }
    statusPayload.attributes.packageName = pkg.name;
    statusPayload.attributes.packageVersion = pkg.version;
    statusPayload.attributes.componentName = 'status';

    createAnalyticsEvent(statusPayload).fire(FABRIC_CHANNEL);
  }
};

export const analyticsState = (isNew: boolean | undefined) =>
  isNew ? 'new' : 'update';
