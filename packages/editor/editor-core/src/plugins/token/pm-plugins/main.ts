import { TokenProvider } from '@uidu/editor-common/provider-factory';
import { EditorState, Plugin } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import { PMPluginFactory } from '../../../types';
import TokenNodeView from '../nodeviews/token';
import { ACTIONS, setProvider } from './actions';
import { pluginKey } from './plugin-key';

export function getPluginState(state: EditorState) {
  return pluginKey.getState(state);
}

const createPlugin: PMPluginFactory = ({
  portalProviderAPI,
  providerFactory,
  dispatch,
}) => {
  let tokenProvider: TokenProvider;

  return new Plugin({
    state: {
      init: () => ({
        tokenProvider: undefined,
        tokens: [],
      }),
      apply: (tr, pluginState) => {
        const { action, params } = tr.getMeta(pluginKey) || {
          action: null,
          params: null,
        };

        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              tokenProvider: params.provider,
            };
            dispatch(pluginKey, newPluginState);

            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              tokens: params.results,
            };
            dispatch(pluginKey, newPluginState);
            return newPluginState;
          default:
            return newPluginState;
        }
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        token: ReactNodeView.fromComponent(TokenNodeView, portalProviderAPI),
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<TokenProvider>,
      ) => {
        if (!providerPromise) {
          return setProvider(undefined)(editorView.state, editorView.dispatch);
        }

        providerPromise
          .then((provider) => {
            tokenProvider = provider;
            setProvider(provider)(editorView.state, editorView.dispatch);
          })
          .catch(() => {});
      };

      providerFactory.subscribe('tokenProvider', providerHandler);

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('tokenProvider', providerHandler);
          }
        },
      };
    },
  });
};

export default createPlugin;
