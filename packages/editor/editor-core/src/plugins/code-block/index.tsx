import * as React from 'react';
import { codeBlock } from '@atlaskit/adf-schema';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';
import keymap from './pm-plugins/keymaps';
import ideUX from './pm-plugins/ide-ux';
import { messages } from '../block-type/types';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';
import { IconCode } from '../quick-insert/assets';
import { PMPluginFactoryParams, EditorPlugin } from '../../types';

export interface CodeBlockOptions {
  enableKeybindingsForIDE?: boolean;
}

const codeBlockPlugin = (options: CodeBlockOptions = {}): EditorPlugin => ({
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
          return addAnalytics(tr, {
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
