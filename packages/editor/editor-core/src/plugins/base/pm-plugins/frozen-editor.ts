import {
  isPerformanceAPIAvailable,
  isPerformanceObserverAvailable,
} from '@uidu/editor-common';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { getNodesCount } from '../../../utils/document';
import {
  ACTION,
  ACTION_SUBJECT,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
} from '../../analytics';

const FREEZE_CHECK_TIME = 600;
const SLOW_INPUT_TIME = 300;

const dispatchLongTaskEvent = (
  dispatchAnalyticsEvent: DispatchAnalyticsEvent,
  view: EditorView,
  time: number,
) => {
  const { state } = view;
  return dispatchAnalyticsEvent({
    action: ACTION.BROWSER_FREEZE,
    actionSubject: ACTION_SUBJECT.EDITOR,
    attributes: {
      freezeTime: time,
      nodeSize: state.doc.nodeSize,
      nodes: getNodesCount(state.doc),
    },
    eventType: EVENT_TYPE.OPERATIONAL,
  });
};

export default (dispatchAnalyticsEvent: DispatchAnalyticsEvent) =>
  new Plugin({
    props: isPerformanceAPIAvailable()
      ? {
          handleTextInput(view) {
            const { state } = view;
            const now = performance.now();
            requestAnimationFrame(() => {
              const diff = performance.now() - now;
              if (diff > SLOW_INPUT_TIME) {
                dispatchAnalyticsEvent({
                  action: ACTION.SLOW_INPUT,
                  actionSubject: ACTION_SUBJECT.EDITOR,
                  attributes: {
                    time: diff,
                    nodeSize: state.doc.nodeSize,
                    nodes: getNodesCount(state.doc),
                  },
                  eventType: EVENT_TYPE.OPERATIONAL,
                });
              }
            });
            return false;
          },
        }
      : undefined,
    view(view) {
      if (!isPerformanceObserverAvailable()) {
        return {};
      }
      let observer: PerformanceObserver | undefined;
      try {
        const observer = new PerformanceObserver(list => {
          const perfEntries = list.getEntries();
          for (let i = 0; i < perfEntries.length; i++) {
            const { duration } = perfEntries[i];
            if (duration > FREEZE_CHECK_TIME) {
              dispatchLongTaskEvent(dispatchAnalyticsEvent, view, duration);
            }
          }
        });

        // register observer for long task notifications
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {}

      return {
        destroy: () => {
          if (observer) {
            observer.disconnect();
          }
        },
      };
    },
  });
