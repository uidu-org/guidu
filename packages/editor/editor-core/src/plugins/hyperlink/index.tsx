import { faLink } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { link } from '@uidu/adf-schema';
import React from 'react';
import { addLink, tooltip } from '../../keymaps';
import { EditorPlugin } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
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
        icon: () => (
          <FontAwesomeIcon icon={faLink} label={formatMessage(messages.link)} />
        ),
        action(insert, state) {
          const tr = insert(undefined);
          tr.setMeta(stateKey, {
            type: LinkAction.SHOW_INSERT_TOOLBAR,
          });

          return tr;
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export type { HyperlinkState } from './pm-plugins/main';

export default hyperlinkPlugin;
