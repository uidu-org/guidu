import { rule } from '@uidu/adf-schema';
import { Fragment } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import React from 'react';
import { EditorPlugin } from '../../types';
import { safeInsert } from '../../utils/insert';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconDivider } from '../quick-insert/assets';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';

const rulePlugin = (): EditorPlugin => ({
  name: 'rule',

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
          let tr: Transaction<any> | null = null;
          /**
           * This is a workaround to get rid of the typeahead text when using quick insert
           * Once we insert *nothing*, we get a new transaction, so we can use the new selection
           * without considering the extra text after the `/` command.
           **/
          tr = insert(Fragment.empty);
          tr = safeInsert(
            state.schema.nodes.rule.createChecked(),
            tr.selection.from,
          )(tr);

          if (!tr) {
            tr = insert(state.schema.nodes.rule.createChecked());
          }

          return tr;
        },
      },
    ],
  },
});

export default rulePlugin;
