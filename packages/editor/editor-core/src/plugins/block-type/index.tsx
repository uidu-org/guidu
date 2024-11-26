import { faQuotes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blockquote, hardBreak, heading } from '@uidu/adf-schema';
import {
  QuickInsertActionInsert,
  QuickInsertItem,
} from '@uidu/editor-common/provider-factory';
import { EditorState } from 'prosemirror-state';
import React from 'react';
import { IntlShape } from 'react-intl';
import * as keymaps from '../../keymaps';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar/types';
import WithPluginState from '../../ui/WithPluginState';
import { IconHeading } from '../quick-insert/assets';
import { setBlockType } from './commands';
import { messages } from './messages';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { BlockTypeNode, BlockTypePluginOptions, HeadingLevels } from './types';
import ToolbarBlockType from './ui/ToolbarBlockType';

const headingPluginOptions = ({
  formatMessage,
}: IntlShape): Array<QuickInsertItem> =>
  Array.from({ length: 6 }, (_v, idx) => {
    const level = (idx + 1) as HeadingLevels;
    const descriptionDescriptor = (messages as any)[
      `heading${level}Description`
    ];
    const keyshortcut = keymaps.tooltip(
      (keymaps as any)[`toggleHeading${level}`],
    );

    return {
      title: formatMessage((messages as any)[`heading${level}`]),
      description: formatMessage(descriptionDescriptor),
      priority: 1300,
      keywords: [`h${level}`],
      keyshortcut,
      icon: () => (
        <IconHeading
          level={level}
          label={formatMessage(descriptionDescriptor)}
        />
      ),
      action(insert: QuickInsertActionInsert, state: EditorState) {
        const tr = insert(state.schema.nodes.heading.createChecked({ level }));
        return tr;
      },
    };
  });

const blockTypePlugin = (options?: BlockTypePluginOptions): EditorPlugin => ({
  name: 'blockType',

  nodes() {
    const nodes: BlockTypeNode[] = [
      { name: 'heading', node: heading },
      { name: 'blockquote', node: blockquote },
      { name: 'hardBreak', node: hardBreak },
    ];

    if (options && options.allowBlockType) {
      const exclude = options.allowBlockType.exclude
        ? options.allowBlockType.exclude
        : [];
      return nodes.filter((node) => exclude.indexOf(node.name) === -1);
    }

    return nodes;
  },

  pmPlugins() {
    return [
      {
        name: 'blockType',
        plugin: ({ dispatch }) =>
          createPlugin(dispatch, options && options.lastNodeMustBeParagraph),
      },
      {
        name: 'blockTypeInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      // Needs to be lower priority than prosemirror-tables.tableEditing
      // plugin as it is currently swallowing right/down arrow events inside tables
      {
        name: 'blockTypeKeyMap',
        plugin: ({ schema }) => keymapPlugin(schema),
      },
    ];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
    eventDispatcher,
  }) {
    const isSmall = toolbarSize < ToolbarSize.XL;
    const boundSetBlockType = (name: string) =>
      setBlockType(name)(editorView.state, editorView.dispatch);

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => (
          <ToolbarBlockType
            isSmall={isSmall}
            isDisabled={disabled}
            isReducedSpacing={isToolbarReducedSpacing}
            setBlockType={boundSetBlockType}
            pluginState={pluginState}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
          />
        )}
      />
    );
  },

  pluginsOptions: {
    quickInsert: (intl) => {
      const { formatMessage } = intl;
      return [
        {
          title: formatMessage(messages.blockquote),
          description: formatMessage(messages.blockquoteDescription),
          priority: 1300,
          keyshortcut: keymaps.tooltip(keymaps.toggleBlockQuote),
          icon: () => (
            <FontAwesomeIcon
              icon={faQuotes}
              label={formatMessage(messages.blockquote)}
            />
          ),
          action(insert, state) {
            const tr = insert(
              state.schema.nodes.blockquote.createChecked(
                {},
                state.schema.nodes.paragraph.createChecked(),
              ),
            );

            return tr;
          },
        },
        ...headingPluginOptions(intl),
      ];
    },
  },
});

export default blockTypePlugin;

export { pluginKey } from './pm-plugins/main';
export type { BlockTypeState } from './pm-plugins/main';
