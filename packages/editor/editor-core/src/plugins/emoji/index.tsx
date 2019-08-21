import { emoji, emojiQuery } from '@atlaskit/adf-schema';
import { Providers, WithProviders } from '@uidu/editor-common';
import * as React from 'react';
import { EditorPlugin } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconEmoji } from '../quick-insert/assets';
import { inputRulePlugin as asciiInputRulePlugin } from './pm-plugins/ascii-input-rules';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymap';
import { createPlugin, emojiPluginKey } from './pm-plugins/main';
import EmojiTypeAhead from './ui/EmojiTypeAhead';
import ToolbarEmojiPicker from './ui/ToolbarEmojiPicker';

const emojiPlugin = (createAnalyticsEvent?: any): EditorPlugin => ({
  nodes() {
    return [{ name: 'emoji', node: emoji }];
  },

  marks() {
    return [{ name: 'emojiQuery', mark: emojiQuery }];
  },

  pmPlugins() {
    return [
      {
        name: 'emoji',
        plugin: ({ providerFactory, portalProviderAPI, props }) =>
          createPlugin(portalProviderAPI, providerFactory, props.appearance),
      },
      {
        name: 'emojiInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      { name: 'emojiKeymap', plugin: () => keymap() },
      {
        name: 'emojiAsciiInputRule',
        plugin: ({ schema, providerFactory }) =>
          asciiInputRulePlugin(schema, providerFactory),
      },
    ];
  },

  contentComponent({
    editorView,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    dispatchAnalyticsEvent,
  }) {
    const renderNode = (providers: Providers) => {
      return (
        <EmojiTypeAhead
          editorView={editorView}
          pluginKey={emojiPluginKey}
          emojiProvider={providers.emojiProvider}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
          dispatchAnalyticsEvent={dispatchAnalyticsEvent}
          createAnalyticsEvent={createAnalyticsEvent}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  },

  secondaryToolbarComponent({
    editorView,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
  }) {
    const renderNode = (providers: Providers) => {
      return (
        <ToolbarEmojiPicker
          editorView={editorView}
          pluginKey={emojiPluginKey}
          emojiProvider={providers.emojiProvider}
          numFollowingButtons={4}
          isReducedSpacing={true}
          isDisabled={disabled}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
          popupsScrollableElement={popupsScrollableElement}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
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
          const mark = state.schema.mark('emojiQuery');
          const emojiText = state.schema.text(':', [mark]);
          const tr = insert(emojiText);
          return addAnalytics(tr, {
            action: ACTION.INVOKED,
            actionSubject: ACTION_SUBJECT.TYPEAHEAD,
            actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],
  },
});

export default emojiPlugin;
