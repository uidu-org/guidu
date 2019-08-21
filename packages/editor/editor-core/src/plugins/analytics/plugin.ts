import { isPerformanceAPIAvailable, measureRender } from '@uidu/editor-common';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { ACTION, AnalyticsEventPayload, EVENT_TYPE } from './types';
import { fireAnalyticsEvent } from './utils';

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

function createPlugin(createAnalyticsEvent?: any) {
  if (!createAnalyticsEvent) {
    return undefined;
  }

  const hasRequiredPerformanceAPIs = isPerformanceAPIAvailable();

  return new Plugin({
    key: analyticsPluginKey,
    state: {
      init: () => null,
      apply: tr => {
        const meta = tr.getMeta(analyticsPluginKey) as
          | { payload: AnalyticsEventPayload; channel?: string }[]
          | undefined;
        if (meta) {
          for (const analytics of meta) {
            const { payload, channel } = analytics;
            fireAnalyticsEvent(createAnalyticsEvent)({ payload, channel });

            // Measures how much time it takes to update the DOM after each ProseMirror document update
            // that has an analytics event.
            if (
              hasRequiredPerformanceAPIs &&
              tr.docChanged &&
              payload.action !== ACTION.INSERTED &&
              payload.action !== ACTION.DELETED
            ) {
              const measureName = `${payload.actionSubject}:${payload.action}:${payload.actionSubjectId}`;
              measureRender(measureName, duration => {
                fireAnalyticsEvent(createAnalyticsEvent)({
                  payload: extendPayload(payload, duration),
                  channel,
                });
              });
            }
          }
        }
      },
    },
  });
}

const analyticsPlugin = (createAnalyticsEvent?: any): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'analyticsPlugin',
        plugin: () => createPlugin(createAnalyticsEvent),
      },
    ];
  },
});

export function extendPayload(
  payload: AnalyticsEventPayload,
  duration: number,
) {
  return {
    ...payload,
    attributes: {
      ...payload.attributes,
      duration,
    },
    eventType: EVENT_TYPE.OPERATIONAL,
  } as AnalyticsEventPayload;
}

export default analyticsPlugin;
