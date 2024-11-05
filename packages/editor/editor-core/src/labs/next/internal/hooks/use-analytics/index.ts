import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import React from 'react';
import { fireAnalyticsEvent } from '../../../../../plugins/analytics';
import { analyticsEventKey } from '../../../../../plugins/analytics/consts';
import { EditorSharedConfig } from '../../../internal/context/shared-config';

/**
 * Subscribes to analytics events fired from editor components
 * and passes them through to `fireAnalyticsEvent`.
 */
export function useAnalyticsHandler(
  editorSharedConfig: EditorSharedConfig | null,
) {
  // handleAnalyticsEvent – must always be the same so we can unsubscribe from events properly.

  if (editorSharedConfig) {
    editorSharedConfig.eventDispatcher.on(analyticsEventKey);
  }

  React.useEffect(
    () => () => {
      if (!editorSharedConfig || !editorSharedConfig.eventDispatcher) {
        return;
      }

      editorSharedConfig.eventDispatcher.off(analyticsEventKey);
    },
    [editorSharedConfig],
  );
}

export function useCreateAnalyticsHandler(
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) {
  return React.useCallback(fireAnalyticsEvent(createAnalyticsEvent), [
    createAnalyticsEvent,
  ]);
}
