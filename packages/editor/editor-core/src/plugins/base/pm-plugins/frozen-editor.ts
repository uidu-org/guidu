import {
  isPerformanceAPIAvailable,
  isPerformanceObserverAvailable,
} from '@uidu/editor-common';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const FREEZE_CHECK_TIME = 600;
const SLOW_INPUT_TIME = 300;
const DEFAULT_KEYSTROKE_SAMPLING_LIMIT = 100;

const dispatchLongTaskEvent = (view: EditorView, time: number) => {
  const { state } = view;
};

export default (inputSamplingLimit?: number) => {
  let keystrokeCount = 0;
  const samplingLimit =
    typeof inputSamplingLimit === 'number'
      ? inputSamplingLimit
      : DEFAULT_KEYSTROKE_SAMPLING_LIMIT;
  return new Plugin({
    props: isPerformanceAPIAvailable()
      ? {
          handleTextInput(view, from: number, to: number, text: string) {
            const { state } = view;
            const now = performance.now();

            requestAnimationFrame(() => {
              const diff = performance.now() - now;
              if (samplingLimit && ++keystrokeCount === samplingLimit) {
                keystrokeCount = 0;
              }

              if (diff > SLOW_INPUT_TIME) {
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
        const observer = new PerformanceObserver((list) => {
          const perfEntries = list.getEntries();
          for (let i = 0; i < perfEntries.length; i++) {
            const { duration } = perfEntries[i];
            if (duration > FREEZE_CHECK_TIME) {
              dispatchLongTaskEvent(view, duration);
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
};
