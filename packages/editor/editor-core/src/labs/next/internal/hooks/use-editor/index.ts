import {
  getResponseEndTime,
  measureRender,
  startMeasure,
  stopMeasure,
} from '@uidu/editor-common';
import { DirectEditorProps } from 'prosemirror-view';
import React from 'react';
import EditorActions from '../../../../../actions';
import {
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
} from '../../../../../plugins/analytics';
import { analyticsEventKey } from '../../../../../plugins/analytics/consts';
import { getNodesCount } from '../../../../../utils';
import measurements from '../../../../../utils/performance/measure-enum';
import { EditorSharedConfig } from '../../context/shared-config';
import { useAnalyticsHandler } from '../use-analytics';
import { createDispatchTransaction } from './create-dispatch-transaction';
import { createEditor, CreateEditorParams } from './create-editor';

export function useEditor(
  config: CreateEditorParams & { editorActions?: EditorActions },
): [EditorSharedConfig | null, (ref: HTMLDivElement | null) => void] {
  startMeasure(measurements.EDITOR_MOUNTED);

  const [editorSharedConfig, mountEditor] = useCreateEditor(config);

  useApplyEditorViewProps(editorSharedConfig, config.disabled);
  useHandleEditorLifecycle(editorSharedConfig);
  useAnalyticsHandler(editorSharedConfig);

  return [editorSharedConfig, mountEditor];
}

/**
 *
 * Sub hooks ¯\_(ツ)_/¯
 *
 */

/**
 * Main hook that creates an instance of EditorView, EditorSharedConfig, etc...
 */
function useCreateEditor(
  config: CreateEditorParams,
): [EditorSharedConfig | null, (ref: HTMLDivElement | null) => void] {
  const [editorSharedConfig, setEditorSharedConfig] =
    React.useState<EditorSharedConfig | null>(null);

  return [
    editorSharedConfig,

    // This callback is being used as `ref={callback}` on EditorContentProvider,
    // When called with `ref` mounts editor and creates editorSharedConfig.
    React.useCallback(
      (ref: HTMLDivElement | null) => {
        // If editorSharedConfig already exists it means that editorView is mounted
        // and we just need to ignore this function altogether.
        if (!ref) {
          return;
        }

        setEditorSharedConfig((editorSharedConfig) => {
          if (!editorSharedConfig) {
            measureRender(
              measurements.PROSEMIRROR_RENDERED,
              (duration, startTime) => {
                if (sharedConfig && sharedConfig.dispatch) {
                  sharedConfig.dispatch(analyticsEventKey, {
                    payload: {
                      action: ACTION.PROSEMIRROR_RENDERED,
                      actionSubject: ACTION_SUBJECT.EDITOR,
                      attributes: {
                        duration,
                        startTime,
                        nodes: getNodesCount(sharedConfig.editorView.state.doc),
                        ttfb: getResponseEndTime(),
                      },
                      eventType: EVENT_TYPE.OPERATIONAL,
                    },
                  });
                }
              },
            );
          }

          const sharedConfig =
            editorSharedConfig || createEditor({ ...config, ref });

          stopMeasure(measurements.EDITOR_MOUNTED, (duration, startTime) => {
            if (!sharedConfig) {
              return;
            }

            // Fire editor mounted event
            sharedConfig.dispatch(analyticsEventKey, {
              payload: {
                action: ACTION.EDITOR_MOUNTED,
                actionSubject: ACTION_SUBJECT.EDITOR,
                attributes: { duration, startTime },
                eventType: EVENT_TYPE.OPERATIONAL,
              },
            });
          });

          return sharedConfig;
        });
      },
      [config],
    ),
  ];
}

/**
 * Applies updated EditorView properties e.g. set dispatchTransaction or 'disabled' state changes
 */
function useApplyEditorViewProps(
  editorSharedConfig: EditorSharedConfig | null,
  disabled?: boolean,
) {
  React.useEffect(() => {
    if (editorSharedConfig) {
      editorSharedConfig.editorView.setProps({
        dispatchTransaction: createDispatchTransaction(editorSharedConfig),
      } as DirectEditorProps);

      editorSharedConfig.editorView.setProps({
        editable: (_state) => !disabled,
      } as DirectEditorProps);
    }
  }, [editorSharedConfig, disabled]);
}

/**
 * Handles editor component unmount
 */
export function useHandleEditorLifecycle(
  editorSharedConfig: EditorSharedConfig | null,
) {
  React.useEffect(() => {
    //#region Did mount
    if (editorSharedConfig) {
      const { onMount, editorActions, editorView, eventDispatcher, dispatch } =
        editorSharedConfig;

      editorActions._privateRegisterEditor(editorView, eventDispatcher);

      if (onMount) {
        onMount(editorActions);
      }

      // Fire editor started event
    }
    //#endregion

    return () => {
      if (!editorSharedConfig) {
        return;
      }

      const { eventDispatcher, editorView, onDestroy, editorActions } =
        editorSharedConfig;

      if (eventDispatcher) {
        eventDispatcher.destroy();
      }

      if (onDestroy) {
        onDestroy();
      }

      editorActions._privateUnregisterEditor();

      if (editorView) {
        // Prevent any transactions from coming through when unmounting
        editorView.setProps({
          dispatchTransaction: (_tr) => {},
        } as DirectEditorProps);

        // Destroy plugin states and editor state
        // when the editor is being unmounted
        const editorState = editorView.state;
        editorState.plugins.forEach((plugin) => {
          const state = plugin.getState(editorState);
          if (state && state.destroy) {
            state.destroy();
          }
        });

        editorView.destroy();
      }
    };
  }, [editorSharedConfig]);
}
