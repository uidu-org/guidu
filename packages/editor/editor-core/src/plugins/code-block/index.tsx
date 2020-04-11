import { codeBlock } from '@uidu/adf-schema';
import * as React from 'react';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../block-type/messages';
import { IconCode } from '../quick-insert/assets';
import ideUX from './pm-plugins/ide-ux';
import keymap from './pm-plugins/keymaps';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

export interface CodeBlockOptions {
  enableKeybindingsForIDE?: boolean;
}

const codeBlockPlugin = (options: CodeBlockOptions = {}): EditorPlugin => ({
  name: 'codeBlock',

  nodes() {
    return [{ name: 'codeBlock', node: codeBlock }];
  },

  pmPlugins() {
    return [
      { name: 'codeBlock', plugin: createPlugin },
      {
        name: 'codeBlockIDEKeyBindings',
        plugin: () => (options.enableKeybindingsForIDE ? ideUX : undefined),
      },
      {
        name: 'codeBlockKeyMap',
        plugin: ({ schema }: PMPluginFactoryParams) => keymap(schema),
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
        icon: () => <IconCode label={formatMessage(messages.codeblock)} />,
        action(insert, state) {
          const schema = state.schema;
          const tr = insert(schema.nodes.codeBlock.createChecked());
          return addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.CODE_BLOCK,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export default codeBlockPlugin;
