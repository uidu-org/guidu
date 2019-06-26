import { ProviderFactory } from '@uidu/editor-common';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { PMPluginFactoryParams } from '../../types';
import { setMacroProvider } from './actions';
import { MacroProvider } from './types';

export * from './actions';
export * from './types';

export const pluginKey = new PluginKey('macroPlugin');

export type MacroState = {
  macroProvider: MacroProvider | null;
};

export const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
) =>
  new Plugin({
    state: {
      init: () => ({ macroProvider: null }),

      apply(tr, state: MacroState) {
        const meta = tr.getMeta(pluginKey);
        if (meta) {
          const newState = { ...state, ...meta };
          dispatch(pluginKey, newState);

          return newState;
        }

        return state;
      },
    },
    key: pluginKey,
    view: (view: EditorView) => {
      // make sure editable DOM node is mounted
      if (view.dom.parentNode) {
        providerFactory.subscribe(
          'macroProvider',
          (_name, provider?: Promise<MacroProvider>) =>
            provider && setMacroProvider(provider)(view),
        );
      }
      return {};
    },
  });

export default {
  pmPlugins() {
    return [
      {
        name: 'macro',
        plugin: ({ dispatch, providerFactory }: PMPluginFactoryParams) =>
          createPlugin(dispatch, providerFactory),
      },
    ];
  },
};
