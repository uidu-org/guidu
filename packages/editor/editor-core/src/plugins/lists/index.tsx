import { faListOl, faListUl } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bulletList, listItem, orderedList } from '@uidu/adf-schema';
import React from 'react';
import { toggleBulletList, toggleOrderedList, tooltip } from '../../keymaps';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar/types';
import WithPluginState from '../../ui/WithPluginState';
import { messages } from '../lists/messages';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';
import { createPlugin, pluginKey } from './pm-plugins/main';
import ToolbarLists from './ui/ToolbarLists';

const listPlugin = (): EditorPlugin => ({
  name: 'list',

  nodes() {
    return [
      { name: 'bulletList', node: bulletList },
      { name: 'orderedList', node: orderedList },
      { name: 'listItem', node: listItem },
    ];
  },

  pmPlugins() {
    return [
      { name: 'lists', plugin: ({ dispatch }) => createPlugin(dispatch) },
      {
        name: 'listsInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      { name: 'listsKeymap', plugin: () => keymapPlugin() },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.unorderedList),
        description: formatMessage(messages.unorderedListDescription),
        keywords: ['ul', 'unordered list'],
        priority: 1100,
        keyshortcut: tooltip(toggleBulletList),
        icon: () => (
          <FontAwesomeIcon
            icon={faListUl}
            label={formatMessage(messages.unorderedList)}
          />
        ),
        action(insert, state) {
          const tr = insert(
            state.schema.nodes.bulletList.createChecked(
              {},
              state.schema.nodes.listItem.createChecked(
                {},
                state.schema.nodes.paragraph.createChecked(),
              ),
            ),
          );

          return tr;
        },
      },
      {
        title: formatMessage(messages.orderedList),
        description: formatMessage(messages.orderedListDescription),
        keywords: ['ol', 'ordered list', 'numbered list'],
        priority: 1200,
        keyshortcut: tooltip(toggleOrderedList),
        icon: () => (
          <FontAwesomeIcon
            icon={faListOl}
            label={formatMessage(messages.orderedList)}
          />
        ),
        action(insert, state) {
          const tr = insert(
            state.schema.nodes.orderedList.createChecked(
              {},
              state.schema.nodes.listItem.createChecked(
                {},
                state.schema.nodes.paragraph.createChecked(),
              ),
            ),
          );

          return tr;
        },
      },
    ],
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
  }) {
    const isSmall = toolbarSize < ToolbarSize.L;
    const isSeparator = toolbarSize >= ToolbarSize.S;

    return (
      <WithPluginState
        plugins={{ listsState: pluginKey }}
        render={({ listsState }) => (
          <ToolbarLists
            isSmall={isSmall}
            isSeparator={isSeparator}
            isReducedSpacing={isToolbarReducedSpacing}
            disabled={disabled}
            editorView={editorView}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            bulletListActive={listsState.bulletListActive}
            bulletListDisabled={listsState.bulletListDisabled}
            orderedListActive={listsState.orderedListActive}
            orderedListDisabled={listsState.orderedListDisabled}
          />
        )}
      />
    );
  },
});

export default listPlugin;
