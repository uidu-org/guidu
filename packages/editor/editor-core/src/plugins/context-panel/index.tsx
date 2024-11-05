import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import React from 'react';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';
import { ContextPanelHandler } from './types';

export const pluginKey = new PluginKey<ContextPanelPluginState>(
  'contextPanelPluginKey',
);

export type ContextPanelPluginState = {
  visible: boolean;
  handlers: ContextPanelHandler[];
  contents: React.ReactNode[];
};

export function getPluginState(state: EditorState) {
  return pluginKey.getState(state);
}

function contextPanelPluginFactory(
  contextPanels: Array<ContextPanelHandler>,
  dispatch: Dispatch<ContextPanelPluginState>,
) {
  return new Plugin<ContextPanelPluginState>({
    key: pluginKey,
    state: {
      init(_config, state) {
        return {
          visible: false,
          handlers: contextPanels,
          contents: contextPanels.map((panelContent) => panelContent(state)),
        };
      },

      apply(tr, pluginState, _oldState, newState) {
        let newPluginState = pluginState;
        const meta = tr.getMeta(pluginKey);

        const visible =
          meta && typeof meta.visible !== undefined
            ? meta.visible
            : pluginState.visible;

        if (visible !== pluginState.visible) {
          newPluginState = {
            ...newPluginState,
            visible,
          };
        }

        if (tr.docChanged || tr.selectionSet || (meta && meta.changed)) {
          newPluginState = {
            ...newPluginState,
            contents: pluginState.handlers.map((panelContent) =>
              panelContent(newState),
            ),
          };
        }

        if (newPluginState !== pluginState) {
          dispatch(pluginKey, newPluginState);
        }

        return newPluginState;
      },
    },
  });
}

const contextPanelPlugin = (): EditorPlugin => ({
  name: 'contextPanel',

  pmPlugins(contextPanels: Array<ContextPanelHandler> = []) {
    return [
      {
        name: 'contextPanel',
        plugin: ({ dispatch }) =>
          contextPanelPluginFactory(contextPanels.filter(Boolean), dispatch),
      },
    ];
  },
});

export default contextPanelPlugin;
