import * as React from 'react';
import { rule } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';
import { IconDivider } from '../quick-insert/assets';

const rulePlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'rule', node: rule }];
  },

  pmPlugins() {
    return [
      {
        name: 'ruleInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      {
        name: 'ruleKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.horizontalRule),
        description: formatMessage(messages.horizontalRuleDescription),
        keywords: ['horizontal rule', 'rule', 'line'],
        priority: 1200,
        keyshortcut: '---',
        icon: () => (
          <IconDivider label={formatMessage(messages.horizontalRule)} />
        ),
        action(insert, state) {
          const tr = insert(state.schema.nodes.rule.createChecked());
          return addAnalytics(tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.DIVIDER,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  },
};

export default rulePlugin;
