import { emoji } from '@uidu/adf-schema';
import { ProviderFactory } from '@uidu/editor-common/provider-factory';
import { EmojiDescription, EmojiProvider } from '@uidu/emoji';
import { ButtonItem } from '@uidu/menu';
import { EditorState, Plugin, PluginKey, StateField } from 'prosemirror-state';
import React from 'react';
import { analyticsService } from '../../analytics';
import { Dispatch } from '../../event-dispatcher';
import { Command, EditorPlugin } from '../../types';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconEmoji } from '../quick-insert/assets';
import { typeAheadPluginKey, TypeAheadPluginState } from '../type-ahead';
import { TypeAheadItem } from '../type-ahead/types';
import emojiNodeView from './nodeviews/emoji';
import { EmojiPluginOptions, EmojiPluginState } from './types';

export const defaultListLimit = 50;
const isFullShortName = (query?: string) =>
  query &&
  query.length > 1 &&
  query.charAt(0) === ':' &&
  query.charAt(query.length - 1) === ':';

const emojiPlugin = (options?: EmojiPluginOptions): EditorPlugin => ({
  name: 'emoji',

  nodes() {
    return [{ name: 'emoji', node: emoji }];
  },

  pmPlugins() {
    return [
      {
        name: 'emoji',
        plugin: ({ providerFactory, dispatch, portalProviderAPI }) =>
          emojiPluginFactory(
            dispatch,
            providerFactory,
            portalProviderAPI,
            options,
          ),
      },
      // {
      //   name: 'emojiAsciiInputRule',
      //   plugin: ({ schema, providerFactory }) =>
      //     asciiInputRulePlugin(schema, providerFactory),
      // },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.emoji),
        description: formatMessage(messages.emojiDescription),
        priority: 500,
        keyshortcut: ':',
        icon: () => <IconEmoji label={formatMessage(messages.emoji)} />,
        action(insert, state) {
          const mark = state.schema.mark('typeAheadQuery', {
            trigger: ':',
          });
          const emojiText = state.schema.text(':', [mark]);
          const tr = insert(emojiText);
          return addAnalytics(state, tr, {
            action: ACTION.INVOKED,
            actionSubject: ACTION_SUBJECT.TYPEAHEAD,
            actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],
    typeAhead: {
      trigger: ':',
      // Custom regex must have a capture group around trigger
      // so it's possible to use it without needing to scan through all triggers again
      customRegex: '\\(?(:)',
      getItems(query, state, _intl, { prevActive, queryChanged }) {
        if (!prevActive && queryChanged) {
          analyticsService.trackEvent(
            'uidu.editor-core.emoji.typeahead.open',
            {},
          );
        }

        if (query.charAt(query.length - 1) === ' ') {
          analyticsService.trackEvent(
            'uidu.editor-core.emoji.typeahead.space',
            {},
          );
        }

        const pluginState = getEmojiPluginState(state);

        if (!query) {
          return [];
        }

        return pluginState.emojiProvider.search(query).then((results) => {
          return (results || []).map<TypeAheadItem>((e) => ({
            title: e.title || '',
            key: e.unified || e.shortcodes,
            render({ isSelected, onClick, onHover }) {
              return (
                <ButtonItem
                  onClick={onClick}
                  isSelected={isSelected}
                  onMouseEnter={onHover}
                  iconBefore={
                    <div tw="flex items-center justify-center leading-none">
                      <em-emoji size="2em" shortcodes={e.shortcodes}></em-emoji>
                    </div>
                  }
                  description={e.shortcodes}
                >
                  {e.title}
                </ButtonItem>
              );
            },
            emoji: e,
          }));
        });

        // if (queryChanged && pluginState.emojiProvider) {
        //   pluginState.emojiProvider.filter(query ? `:${query}` : '', {
        //     limit: defaultListLimit,
        //     skinTone: pluginState.emojiProvider.getSelectedTone(),
        //     sort: !query.length
        //       ? SearchSort.UsageFrequency
        //       : SearchSort.Default,
        //   });
        // }

        // return emojis.map<TypeAheadItem>((emoji) => ({
        //   title: emoji.shortName || '',
        //   key: emoji.id || emoji.shortName,
        //   render({ isSelected, onClick, onHover }) {
        //     return (
        //       // It's required to pass emojiProvider through the context for custom emojis to work
        //       <EmojiContextProvider emojiProvider={pluginState.emojiProvider}>
        //         <EmojiTypeAheadItem
        //           emoji={emoji}
        //           selected={isSelected}
        //           onMouseMove={onHover}
        //           onSelection={onClick}
        //         />
        //       </EmojiContextProvider>
        //     );
        //   },
        //   emoji,
        // }));
      },
      forceSelect(query: string, items: Array<TypeAheadItem>) {
        const normalizedQuery = `:${query}`;
        return (
          !!isFullShortName(normalizedQuery) &&
          !!items.find((item) => item.title.toLowerCase() === normalizedQuery)
        );
      },
      selectItem(state, item, insert, { mode }) {
        const {
          unified: id = '',
          type = '',
          fallback,
          shortcodes: shortName,
        } = item.emoji;
        const text = fallback || shortName;
        const emojiPluginState = emojiPluginKey.getState(
          state,
        ) as EmojiPluginState;
        const typeAheadPluginState = typeAheadPluginKey.getState(
          state,
        ) as TypeAheadPluginState;
        const pickerElapsedTime = typeAheadPluginState.queryStarted
          ? Date.now() - typeAheadPluginState.queryStarted
          : 0;

        analyticsService.trackEvent('uidu.editor-core.emoji.typeahead.select', {
          mode,
          duration: pickerElapsedTime,
          emojiId: id,
          type,
          queryLength: (typeAheadPluginState.query || '').length,
        });

        return addAnalytics(
          state,
          insert(
            state.schema.nodes.emoji.createChecked({
              shortName,
              id,
              text,
            }),
          ),
          {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
            attributes: { inputMethod: INPUT_METHOD.TYPEAHEAD },
            eventType: EVENT_TYPE.TRACK,
          },
        );
      },
      dismiss() {
        analyticsService.trackEvent(
          'uidu.editor-core.emoji.typeahead.close',
          {},
        );
      },
    },
  },
});

export default emojiPlugin;

/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
};

export const setProvider =
  (provider?: EmojiProvider): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(emojiPluginKey, {
          action: ACTIONS.SET_PROVIDER,
          params: { provider },
        }),
      );
    }
    return true;
  };

export const setResults =
  (results: { emojis: Array<EmojiDescription> }): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(emojiPluginKey, {
          action: ACTIONS.SET_RESULTS,
          params: { results },
        }),
      );
    }
    return true;
  };

export const emojiPluginKey = new PluginKey('emojiPlugin');

export function getEmojiPluginState(state: EditorState) {
  return (emojiPluginKey.getState(state) || {}) as EmojiPluginState;
}

export function emojiPluginFactory(
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  portalProviderAPI: PortalProviderAPI,
  options?: EmojiPluginOptions,
) {
  let emojiProvider: EmojiProvider;
  let emojiProviderChangeHandler: {
    result(res: { emojis: Array<EmojiDescription> }): void;
  };

  return new Plugin({
    key: emojiPluginKey,
    state: {
      init() {
        return {};
      },
      apply(tr, pluginState) {
        const { action, params } = tr.getMeta(emojiPluginKey) || {
          action: null,
          params: null,
        };

        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              emojiProvider: params.provider,
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              emojis: params.results.emojis,
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;
        }

        return newPluginState;
      },
    } as StateField<EmojiPluginState>,
    props: {
      nodeViews: {
        emoji: emojiNodeView(portalProviderAPI, providerFactory, options),
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<EmojiProvider>,
      ) => {
        switch (name) {
          case 'emojiProvider':
            if (!providerPromise) {
              return setProvider(undefined)(
                editorView.state,
                editorView.dispatch,
              );
            }

            providerPromise
              .then((provider) => {
                emojiProvider = provider;
                setProvider(provider)(editorView.state, editorView.dispatch);
              })
              .catch(() =>
                setProvider(undefined)(editorView.state, editorView.dispatch),
              );
            break;
        }
        return undefined;
      };

      providerFactory.subscribe('emojiProvider', providerHandler);

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('emojiProvider', providerHandler);
          }
          if (emojiProvider && emojiProviderChangeHandler) {
            emojiProvider.unsubscribe(emojiProviderChangeHandler);
          }
        },
      };
    },
  });
}
