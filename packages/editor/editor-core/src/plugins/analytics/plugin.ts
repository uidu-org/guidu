import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { AnalyticsEventPayload } from './types';
import { fireAnalyticsEvent } from './utils';

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

function createPlugin(createAnalyticsEvent?: any) {
  if (!createAnalyticsEvent) {
    return undefined;
  }

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

export default analyticsPlugin;
