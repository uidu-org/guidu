import { EditorState, Plugin } from 'prosemirror-state';
import { pmHistoryPluginKey, PmHistoryPluginState } from './pm-history-types';

export const getPmHistoryPlugin = (state: EditorState): Plugin | undefined => {
  return state.plugins.find(
    (plugin) => (plugin as any).key === pmHistoryPluginKey,
  );
};

export const getPmHistoryPluginState = (
  state: EditorState,
): PmHistoryPluginState | undefined => {
  const pmHistoryPlugin = getPmHistoryPlugin(state);
  if (!pmHistoryPlugin) {
    return undefined;
  }
  return pmHistoryPlugin.getState(state);
};
