import { blockquote, hardBreak, heading } from '@uidu/adf-schema';
import { NodeSpec } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import * as React from 'react';
import { IntlShape } from 'react-intl';
import * as keymaps from '../../keymaps';
import { AllowedBlockTypes, EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { IconHeading, IconQuote } from '../quick-insert/assets';
import {
  QuickInsertActionInsert,
  QuickInsertItem,
} from '../quick-insert/types';
import { setBlockTypeWithAnalytics } from './commands';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { HeadingLevels, messages } from './types';
import ToolbarBlockType from './ui/ToolbarBlockType';

interface BlockTypeNode {
  name: AllowedBlockTypes;
  node: NodeSpec;
}

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
        return addAnalytics(state, tr, {
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT,
            newHeadingLevel: level,
          },
        });
      },
    };
  });

interface BlockTypePluginOptions {
  lastNodeMustBeParagraph?: boolean;
}

const blockTypePlugin = (options?: BlockTypePluginOptions): EditorPlugin => ({
  name: 'blockType',

  nodes({ allowBlockType }) {
    const nodes: BlockTypeNode[] = [
      { name: 'heading', node: heading },
      { name: 'blockquote', node: blockquote },
      { name: 'hardBreak', node: hardBreak },
    ];

    if (allowBlockType) {
      const exclude = allowBlockType.exclude ? allowBlockType.exclude : [];
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
      setBlockTypeWithAnalytics(name, INPUT_METHOD.TOOLBAR)(
        editorView.state,
        editorView.dispatch,
      );

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => {
          return (
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
          );
        }}
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
          icon: () => <IconQuote label={formatMessage(messages.blockquote)} />,
          action(insert, state) {
            const tr = insert(
              state.schema.nodes.blockquote.createChecked(
                {},
                state.schema.nodes.paragraph.createChecked(),
              ),
            );

            return addAnalytics(state, tr, {
              action: ACTION.FORMATTED,
              actionSubject: ACTION_SUBJECT.TEXT,
              eventType: EVENT_TYPE.TRACK,
              actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
              attributes: {
                inputMethod: INPUT_METHOD.QUICK_INSERT,
              },
            });
          },
        },
        ...headingPluginOptions(intl),
      ];
    },
  },
});

export default blockTypePlugin;
export { BlockTypeState, pluginKey } from './pm-plugins/main';
