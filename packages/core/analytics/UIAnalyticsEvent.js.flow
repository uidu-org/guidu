// @flow

import AnalyticsEvent from './AnalyticsEvent';
import type {
  AnalyticsEventUpdater,
  UIAnalyticsEventHandler,
  UIAnalyticsEventInterface,
  UIAnalyticsEventProps,
} from './types';

const { warn } = console;

export default class UIAnalyticsEvent extends AnalyticsEvent
  implements UIAnalyticsEventInterface {
  context: Array<{}>;
  handlers: Array<UIAnalyticsEventHandler>;
  hasFired: boolean;

  constructor(props: UIAnalyticsEventProps) {
    super(props);
    this.context = props.context || [];
    this.handlers = props.handlers || [];
    this.hasFired = false;
  }

  clone = (): UIAnalyticsEvent | null => {
    if (this.hasFired) {
      warn("Cannot clone an event after it's been fired.");
      return null;
    }
    const context = [...this.context];
    const handlers = [...this.handlers];

    // We stringify and parse here to get a hacky "deep clone" of the object.
    // This has some limitations in that it wont support functions, regexs, Maps, Sets, etc,
    // but none of those need to be represented in our payload, so we consider this fine
    const payload = JSON.parse(JSON.stringify(this.payload));

    return new UIAnalyticsEvent({ context, handlers, payload });
  };

  fire = (channel?: string) => {
    if (this.hasFired) {
      warn('Cannot fire an event twice.');
      return;
    }
    this.handlers.forEach(handler => {
      handler(this, channel);
    });
    this.hasFired = true;
  };

  update(updater: AnalyticsEventUpdater): this {
    if (this.hasFired) {
      warn("Cannot update an event after it's been fired.");
      return this;
    }
    return super.update(updater);
  }
}
