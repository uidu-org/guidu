import { link } from '@uidu/adf-schema';
import React from 'react';
import { addLink, tooltip } from '../../keymaps';
import { EditorPlugin } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconLink } from '../quick-insert/assets';
import fakeCursorToolbarPlugin from './pm-plugins/fake-cursor-for-toolbar';
import { createInputRulePlugin } from './pm-plugins/input-rule';
import { createKeymapPlugin } from './pm-plugins/keymap';
import { LinkAction, plugin, stateKey } from './pm-plugins/main';
import { getToolbarConfig } from './Toolbar';

const hyperlinkPlugin = (): EditorPlugin => ({
  name: 'hyperlink',

  marks() {
    return [{ name: 'link', mark: link }];
  },

  pmPlugins() {
    return [
      { name: 'hyperlink', plugin: ({ dispatch }) => plugin(dispatch) },
      {
        name: 'fakeCursorToolbarPlugin',
        plugin: () => fakeCursorToolbarPlugin,
      },
      {
        name: 'hyperlinkInputRule',
        plugin: ({ schema }) => createInputRulePlugin(schema),
      },
      {
        name: 'hyperlinkKeymap',
        plugin: () => createKeymapPlugin(),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.link),
        description: formatMessage(messages.linkDescription),
        keywords: ['url', 'link', 'hyperlink'],
        priority: 1200,
        keyshortcut: tooltip(addLink),
        icon: () => <IconLink label={formatMessage(messages.link)} />,
        action(insert, state) {
          const tr = insert(undefined);
          tr.setMeta(stateKey, {
            type: LinkAction.SHOW_INSERT_TOOLBAR,
            inputMethod: INPUT_METHOD.QUICK_INSERT,
          });

          return addAnalytics(state, tr, {
            action: ACTION.INVOKED,
            actionSubject: ACTION_SUBJECT.TYPEAHEAD,
            actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export type { HyperlinkState } from './pm-plugins/main';

export default hyperlinkPlugin;
