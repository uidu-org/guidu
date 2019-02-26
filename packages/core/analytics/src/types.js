// @flow

import AnalyticsEvent from './AnalyticsEvent';
import UIAnalyticsEvent from './UIAnalyticsEvent';

// Basic events
export type AnalyticsEventPayload = {
  [string]: any,
};

export type AnalyticsEventUpdater =
  | {}
  | ((payload: AnalyticsEventPayload) => AnalyticsEventPayload);

export type AnalyticsEventProps = {
  payload: AnalyticsEventPayload,
};

export interface AnalyticsEventInterface {
  payload: AnalyticsEventPayload;

  clone(): AnalyticsEvent;
  update(updater: AnalyticsEventUpdater): AnalyticsEvent;
}

// UI events
type ChannelIdentifier = string;

export type UIAnalyticsEventHandler = (
  event: UIAnalyticsEvent,
  channel?: ChannelIdentifier,
) => void;

export type UIAnalyticsEventProps = AnalyticsEventProps & {
  context?: Array<{}>,
  handlers?: Array<UIAnalyticsEventHandler>,
};

export interface UIAnalyticsEventInterface {
  context: Array<{}>;
  handlers?: Array<UIAnalyticsEventHandler>;
  hasFired: boolean;
  payload: AnalyticsEventPayload;

  clone(): UIAnalyticsEvent | null;
  fire(channel?: ChannelIdentifier): void;
  update(updater: AnalyticsEventUpdater): AnalyticsEvent;
}
