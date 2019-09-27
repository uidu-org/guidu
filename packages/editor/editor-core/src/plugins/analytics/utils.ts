import { editorAnalyticsChannel } from './index';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { AnalyticsEventPayload } from './types';
import { Transaction, EditorState } from 'prosemirror-state';
import { Command } from '../../types';
import { InputRuleWithHandler } from '../../utils/input-rules';
import { analyticsPluginKey } from './plugin';

export type DispatchAnalyticsEvent = (payload: AnalyticsEventPayload) => void;
export type HigherOrderCommand = (command: Command) => Command;

export function addAnalytics(
  tr: Transaction,
  payload: AnalyticsEventPayload,
  channel?: string,
): Transaction {
  const analyticsMeta = tr.getMeta(analyticsPluginKey) || [];
  analyticsMeta.push({ payload, channel });
  return tr.setMeta(analyticsPluginKey, analyticsMeta);
}

export function withAnalytics(
  payload:
    | AnalyticsEventPayload
    | ((state: EditorState) => AnalyticsEventPayload | undefined),
  channel?: string,
): HigherOrderCommand {
  return command => (state, dispatch, view) =>
    command(
      state,
      tr => {
        if (dispatch) {
          if (payload instanceof Function) {
            const dynamicPayload = payload(state);
            if (dynamicPayload) {
              dispatch(addAnalytics(tr, dynamicPayload, channel));
            }
          } else {
            dispatch(addAnalytics(tr, payload, channel));
          }
        }
      },
      view,
    );
}

export function ruleWithAnalytics(
  getPayload: (
    state: EditorState,
    match: string[],
    start: number,
    end: number,
  ) => AnalyticsEventPayload,
) {
  return (rule: InputRuleWithHandler) => {
    // Monkey patching handler to add analytics
    const handler = rule.handler;

    rule.handler = (
      state: EditorState,
      match,
      start,
      end,
    ): Transaction<any> | null => {
      let tr = handler(state, match, start, end);

      if (tr) {
        const payload = getPayload(state, match, start, end);
        tr = addAnalytics(tr, payload);
      }
      return tr;
    };
    return rule;
  };
}

export const fireAnalyticsEvent = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => ({
  payload,
  channel = editorAnalyticsChannel,
}: {
  payload: AnalyticsEventPayload;
  channel?: string;
}) => {
  return createAnalyticsEvent && createAnalyticsEvent(payload).fire(channel);
};
