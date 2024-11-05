import { ProviderFactory } from '@uidu/editor-common';
import { Plugin, PluginKey } from 'prosemirror-state';
import { IntlShape } from 'react-intl';
import { Command, EditorPlugin } from '../../types';
import { dedupe } from '../../utils';
import { find } from './search';
import {
  QuickInsertHandler,
  QuickInsertItem,
  QuickInsertProvider,
} from './types';

const quickInsertPlugin = (): EditorPlugin => ({
  name: 'quickInsert',

  pmPlugins(quickInsert: Array<QuickInsertHandler>) {
    return [
      {
        name: 'quickInsert', // It's important that this plugin is above TypeAheadPlugin
        plugin: ({ providerFactory }) =>
          quickInsertPluginFactory(quickInsert, providerFactory),
      },
    ];
  },

  pluginsOptions: {
    typeAhead: {
      trigger: '/',
      getItems: (
        query,
        state,
        intl,
        { prevActive, queryChanged },
        _tr,
        dispatch,
      ) => {
        const quickInsertState = pluginKey.getState(state);

        const defaultItems = processItems(quickInsertState.items, intl);
        const defaultSearch = () => find(query, defaultItems as any);

        if (quickInsertState.provider) {
          return (quickInsertState.provider as Promise<Array<QuickInsertItem>>)
            .then((items) =>
              find(
                query,
                dedupe(
                  [...(defaultItems as any), ...items],
                  (item) => item.title,
                ),
              ),
            )
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.error(err);
              return defaultSearch();
            });
        }

        return defaultSearch();
      },
      selectItem: (state, item, insert) =>
        (item as QuickInsertItem).action(insert, state),
    },
  },
});

export default quickInsertPlugin;

const itemsCache: Record<string, Array<QuickInsertItem>> = {};
const processItems = (items: Array<QuickInsertHandler>, intl: IntlShape) => {
  if (!itemsCache[intl.locale]) {
    itemsCache[intl.locale] = items.reduce(
      (acc: Array<QuickInsertItem>, item) => {
        if (typeof item === 'function') {
          return acc.concat(item(intl));
        }
        return acc.concat(item);
      },
      [],
    );
  }
  return itemsCache[intl.locale];
};

/**
 *
 * ProseMirror Plugin
 *
 */

export const pluginKey = new PluginKey('quickInsertPluginKey');

export const setProvider =
  (provider: Promise<Array<QuickInsertItem>>): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.setMeta(pluginKey, provider));
    }
    return true;
  };

function quickInsertPluginFactory(
  quickInsertItems: Array<QuickInsertHandler>,
  providerFactory: ProviderFactory,
) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return {
          items: quickInsertItems || [],
        };
      },

      apply(tr, pluginState) {
        const provider = tr.getMeta(pluginKey);
        if (provider) {
          return { ...pluginState, provider };
        }
        return pluginState;
      },
    },

    view(editorView) {
      const providerHandler = (
        _name: string,
        providerPromise?: Promise<QuickInsertProvider>,
      ) => {
        if (providerPromise) {
          setProvider(
            providerPromise.then((provider: QuickInsertProvider) =>
              provider.getItems(),
            ),
          )(editorView.state, editorView.dispatch);
        }
      };

      providerFactory.subscribe('quickInsertProvider', providerHandler);

      return {
        destroy() {
          providerFactory.unsubscribe('quickInsertProvider', providerHandler);
        },
      };
    },
  });
}
