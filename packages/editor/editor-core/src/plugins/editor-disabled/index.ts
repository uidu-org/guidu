import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

import { pluginFactory } from '../../utils/plugin-state-factory';

export const pluginKey = new PluginKey('editorDisabledPlugin');

export type EditorDisabledPluginState = {
  editorDisabled: boolean;
};

function reducer(
  _pluginState: EditorDisabledPluginState,
  meta: EditorDisabledPluginState,
) {
  return meta;
}

const { createPluginState, getPluginState } = pluginFactory(pluginKey, reducer);

/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
export function createPlugin(
  dispatch: Dispatch<EditorDisabledPluginState>,
  oldState?: EditorState,
): Plugin | undefined {
  return new Plugin({
    key: pluginKey,
    state: createPluginState(
      dispatch,
      (oldState && getPluginState(oldState)) || { editorDisabled: false },
    ),
  });
}

const editorDisabledPlugin: EditorPlugin = {
  pmPlugins: () => [
    {
      name: 'editorDisabled',
      plugin: ({ dispatch, oldState }) => createPlugin(dispatch, oldState),
    },
  ],
};

export default editorDisabledPlugin;
