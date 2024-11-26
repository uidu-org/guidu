import { faCode } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { codeBlock } from '@uidu/adf-schema';
import React from 'react';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import { messages } from '../block-type/messages';
import ideUX from './pm-plugins/ide-ux';
import keymap from './pm-plugins/keymaps';
import { LowlightPlugin } from './pm-plugins/lowlight';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

const codeBlockPlugin = (): EditorPlugin => ({
  name: 'codeBlock',

  nodes() {
    return [{ name: 'codeBlock', node: codeBlock }];
  },

  pmPlugins() {
    return [
      { name: 'codeBlock', plugin: createPlugin },
      {
        name: 'codeBlockIDEKeyBindings',
        plugin: () => ideUX,
      },
      {
        name: 'codeBlockKeyMap',
        plugin: ({ schema }: PMPluginFactoryParams) => keymap(schema),
      },
      {
        name: 'codeBlockLowlight',
        plugin: () =>
          LowlightPlugin({
            name: 'codeBlock',
            defaultLanguage: 'text',
          }),
      },
    ];
  },
  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.codeblock),
        description: formatMessage(messages.codeblockDescription),
        priority: 700,
        keyshortcut: '```',
        icon: () => <FontAwesomeIcon icon={faCode} />,
        action(insert, state) {
          const schema = state.schema;
          const tr = insert(schema.nodes.codeBlock.createChecked());
          return tr;
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export default codeBlockPlugin;
