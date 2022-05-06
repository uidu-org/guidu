import { useCallback, useContext } from 'react';
import { AnalyticsEventPayload } from '../AnalyticsEvent';
import { AnalyticsReactContext } from '../AnalyticsReactContext';
import { CreateUIAnalyticsEvent } from '../types';
import UIAnalyticsEvent from '../UIAnalyticsEvent';

export type UseAnalyticsEventsHook = {
  createAnalyticsEvent: CreateUIAnalyticsEvent;
};

export function useAnalyticsEvents(): UseAnalyticsEventsHook {
  const { getAnalyticsEventHandlers, getAnalyticsContext } = useContext(
    AnalyticsReactContext,
  );

  if (
    (getAnalyticsEventHandlers === null || getAnalyticsContext === null) &&
    process.env.NODE_ENV !== 'production'
  ) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `No compatible AnalyticsListener is listening to this event fire. Use of this hook requires the firing component/hook to be wrapped in an AnalyticsListener from @uidu/analytics@^6.3.0 or above.`,
    );
  }

  const createAnalyticsEvent = useCallback(
    (payload: AnalyticsEventPayload): UIAnalyticsEvent => {
      console.log(AnalyticsReactContext);
      return new UIAnalyticsEvent({
        context: getAnalyticsContext(),
        handlers: getAnalyticsEventHandlers(),
        payload,
      });
    },
    [getAnalyticsEventHandlers, getAnalyticsContext],
  );

  return {
    createAnalyticsEvent,
  };
}
