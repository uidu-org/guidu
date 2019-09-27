import { useContext, useCallback } from 'react';

import { AnalyticsReactContext } from './AnalyticsReactContext';
import { CreateUIAnalyticsEvent } from './types';
import UIAnalyticsEvent from './UIAnalyticsEvent';
import { AnalyticsEventPayload } from './AnalyticsEvent';

export type UseAnalyticsEventsHook = {
  createAnalyticsEvent: CreateUIAnalyticsEvent;
};

export function useAnalyticsEvents(): UseAnalyticsEventsHook {
  const {
    getAtlaskitAnalyticsEventHandlers,
    getAtlaskitAnalyticsContext,
  } = useContext(AnalyticsReactContext);

  if (
    (getAtlaskitAnalyticsEventHandlers === null ||
      getAtlaskitAnalyticsContext === null) &&
    process.env.NODE_ENV !== 'production'
  ) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `No compatible AnalyticsListener is listening to this event fire. Use of this hook requires the firing component/hook to be wrapped in an AnalyticsListener from @atlaskit/analytics-next@^6.3.0 or above.`,
    );
  }

  const createAnalyticsEvent = useCallback(
    (payload: AnalyticsEventPayload): UIAnalyticsEvent =>
      new UIAnalyticsEvent({
        context: getAtlaskitAnalyticsContext(),
        handlers: getAtlaskitAnalyticsEventHandlers(),
        payload,
      }),
    [getAtlaskitAnalyticsEventHandlers, getAtlaskitAnalyticsContext],
  );

  return {
    createAnalyticsEvent,
  };
}
