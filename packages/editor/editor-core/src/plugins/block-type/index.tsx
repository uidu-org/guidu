import { blockquote, hardBreak, heading } from '@atlaskit/adf-schema';
import { NodeSpec } from 'prosemirror-model';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ToolbarSize } from '../../components/Toolbar';
import WithPluginState from '../../components/WithPluginState';
import { toggleBlockQuote, tooltip } from '../../keymaps';
import { AllowedBlockTypes, EditorPlugin } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { IconQuote } from '../quick-insert/assets';
import { setBlockTypeWithAnalytics } from './commands';
import inputRulePlugin from './pm-plugins/input-rule';
import keymapPlugin from './pm-plugins/keymap';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { messages } from './types';
import ToolbarBlockType from './ui/ToolbarBlockType';

interface BlockTypeNode {
  name: AllowedBlockTypes;
  node: NodeSpec;
}

const blockType: EditorPlugin = {
  nodes({ allowBlockType }) {
    const nodes: BlockTypeNode[] = [
      { name: 'heading', node: heading },
      { name: 'blockquote', node: blockquote },
      { name: 'hardBreak', node: hardBreak },
    ];

    if (allowBlockType) {
      const exclude = allowBlockType.exclude ? allowBlockType.exclude : [];
      return nodes.filter(node => exclude.indexOf(node.name) === -1);
    }

    return nodes;
  },

  pmPlugins() {
    return [
      {
        name: 'blockType',
        plugin: ({ props, dispatch }) =>
          createPlugin(dispatch, props.appearance),
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
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.blockquote),
        description: formatMessage(messages.blockquoteDescription),
        priority: 1300,
        keyshortcut: tooltip(toggleBlockQuote),
        icon: () => (
          <FormattedMessage {...messages.blockquote}>
            {(label: string) => <IconQuote label={label} />}
          </FormattedMessage>
        ),
        action(insert, state) {
          const tr = insert(
            state.schema.nodes.blockquote.createChecked(
              {},
              state.schema.nodes.paragraph.createChecked(),
            ),
          );

          return addAnalytics(tr, {
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
    ],
  },
};

export default blockType;
export { BlockTypeState, pluginKey } from './pm-plugins/main';
