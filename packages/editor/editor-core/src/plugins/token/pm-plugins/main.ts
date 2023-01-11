import { EditorState, Plugin } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import { PMPluginFactory } from '../../../types';
import TokenNodeView from '../nodeviews/token';
import { pluginKey } from './plugin-key';

export function getPluginState(state: EditorState) {
  return pluginKey.getState(state);
}

const createPlugin: PMPluginFactory = (pmPluginFactoryParams) =>
  new Plugin({
    state: {
      init: () => ({}),
      apply: (tr, pluginState) => pluginState,
    },
    key: pluginKey,
    props: {
      nodeViews: {
        token: ReactNodeView.fromComponent(
          TokenNodeView,
          pmPluginFactoryParams.portalProviderAPI,
        ),
      },
    },
  });

export default createPlugin;
