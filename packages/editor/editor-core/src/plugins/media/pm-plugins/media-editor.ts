import { ProviderFactory } from '@uidu/editor-common';
import { Plugin, PluginKey, PluginSpec } from 'prosemirror-state';
import { PMPluginFactoryParams } from '../../../types';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import { setMediaContext } from '../commands/media-editor';
import { MediaEditorAction, MediaEditorState, MediaProvider } from '../types';

export const pluginKey = new PluginKey('mediaEditorPlugin');

export const reducer = (
  state: MediaEditorState,
  action: MediaEditorAction,
): MediaEditorState => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        editor: {
          identifier: action.identifier,
          pos: action.pos,
        },
      };
    case 'close':
      return {
        ...state,
        editor: undefined,
      };
    case 'upload':
      return {
        ...state,
        editor: undefined,
      };
    case 'setContext':
      return {
        ...state,
        context: action.context,
      };
    default:
      return state;
  }
};

// handle mapping changes to providers -> plugin state
const pluginView = (
  providerFactory: ProviderFactory,
): PluginSpec['view'] => view => {
  const updateMediaProvider = async (
    name: string,
    provider?: Promise<MediaProvider>,
  ) => {
    if (name !== 'mediaProvider') {
      return undefined;
    }

    const resolvedProvider = await provider;
    if (!resolvedProvider) {
      return undefined;
    }

    const resolvedContext = await (resolvedProvider.uploadContext ||
      resolvedProvider.viewContext);
    const { dispatch, state } = view;
    setMediaContext(resolvedContext)(state, dispatch, view);
  };

  providerFactory.subscribe('mediaProvider', updateMediaProvider);

  return {
    destroy() {
      providerFactory.unsubscribe('mediaProvider', updateMediaProvider);
    },
  };
};

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
  {
    mapping: (tr, state) => {
      if (!state.editor) {
        return state;
      }

      // remap the position of the editing media inside the state
      return {
        ...state,
        editor: {
          ...state.editor,
          pos: tr.mapping.map(state.editor.pos),
        },
      };
    },
  },
);

export const createPlugin = ({
  dispatch,
  providerFactory,
}: PMPluginFactoryParams) => {
  return new Plugin({
    state: createPluginState(dispatch, {}),
    key: pluginKey,
    view: pluginView(providerFactory),
  });
};

export { createCommand, getPluginState };

