import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  measureRender,
  isPerformanceAPIAvailable,
} from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import {
  AnalyticsEventPayload,
  EVENT_TYPE,
  AnalyticsEventPayloadWithChannel,
  ACTION,
} from './types';
import { AnalyticsStep } from './analytics-step';
import { fireAnalyticsEvent } from './utils';

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

function createPlugin(createAnalyticsEvent?: CreateUIAnalyticsEvent) {
  if (!createAnalyticsEvent) {
    return;
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

            // Measures how much time it takes to update the DOM after each ProseMirror document update
            // that has an analytics event.
            if (
              hasRequiredPerformanceAPIs &&
              tr.docChanged &&
              payload.action !== ACTION.INSERTED &&
              payload.action !== ACTION.DELETED
            ) {
              const measureName = `${payload.actionSubject}:${payload.action}:${
                payload.actionSubjectId
              }`;
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
    appendTransaction(
      transactions,
      oldState: EditorState,
      newState: EditorState,
    ) {
      const analyticsEvents: AnalyticsEventPayloadWithChannel[] = transactions
        .map(
          (tr): AnalyticsEventPayloadWithChannel[] =>
            tr.getMeta(analyticsPluginKey),
        )
        .filter(analyticsMeta => !!analyticsMeta)
        .reduce(
          (allAnalyticsEvents, trAnalyticsEvents) => [
            ...allAnalyticsEvents,
            ...trAnalyticsEvents,
          ],
          [],
        );

      if (analyticsEvents.length > 0) {
        const tr = newState.tr.step(
          new AnalyticsStep(createAnalyticsEvent, analyticsEvents),
        );

        // Preserve marks eg. if user clicked bold button with no selection
        if (newState.tr.storedMarks) {
          tr.setStoredMarks(newState.tr.storedMarks);
        }

        // Preserve active input rule
        // Appending this transaction will deactivate an input rule, as a transaction
        // with steps is interpreted as the doc changing
        // This is needed so undo of autoformatting works as expected, this is a special
        // case handled by prosemirror-inputrules plugin
        const activeInputRulePlugin = newState.plugins.find(
          plugin => plugin.spec.isInputRules && plugin.getState(newState),
        );
        if (activeInputRulePlugin) {
          const inputRuleState = activeInputRulePlugin.getState(newState);
          inputRuleState.transform.step(
            new AnalyticsStep(createAnalyticsEvent, analyticsEvents),
          );
          tr.setMeta(activeInputRulePlugin, inputRuleState);
        }

        return tr;
      }

      return null;
    },
  });
}

const analyticsPlugin = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
): EditorPlugin => ({
  name: 'analytics',

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
