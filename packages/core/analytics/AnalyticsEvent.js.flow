// @flow

import type {
  AnalyticsEventPayload,
  AnalyticsEventUpdater,
  AnalyticsEventInterface,
  AnalyticsEventProps,
} from './types';

export default class AnalyticsEvent implements AnalyticsEventInterface {
  payload: AnalyticsEventPayload;

  constructor(props: AnalyticsEventProps) {
    this.payload = props.payload;
  }

  clone = (): AnalyticsEvent => {
    // We stringify and parse here to get a hacky "deep clone" of the object.
    // This has some limitations in that it wont support functions, regexs, Maps, Sets, etc,
    // but none of those need to be represented in our payload, so we consider this fine
    const payload = JSON.parse(JSON.stringify(this.payload));

    return new AnalyticsEvent({ payload });
  };

  update(updater: AnalyticsEventUpdater): this {
    if (typeof updater === 'function') {
      this.payload = updater(this.payload);
    } else if (typeof updater === 'object') {
      this.payload = {
        ...this.payload,
        ...updater,
      };
    }

    return this;
  }
}
