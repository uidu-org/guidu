import { status } from '@atlaskit/adf-schema';
import { findDomRefAtPos } from 'prosemirror-utils';
import * as React from 'react';
import WithPluginState from '../../components/WithPluginState';
import { EditorPlugin } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconStatus } from '../quick-insert/assets';
import { commitStatusPicker, createStatus, updateStatus } from './actions';
import { keymapPlugin } from './keymap';
import createStatusPlugin, {
  pluginKey,
  StatusState,
  StatusType,
} from './plugin';
import StatusPicker from './ui/statusPicker';

const baseStatusPlugin = (): EditorPlugin => ({
  nodes() {
    return [{ name: 'status', node: status }];
  },

  pmPlugins() {
    return [
      {
        name: 'status',
        plugin: createStatusPlugin,
      },
      { name: 'statusKeymap', plugin: keymapPlugin },
    ];
  },

  contentComponent({ editorView }) {
    const domAtPos = editorView.domAtPos.bind(editorView);
    return (
      <WithPluginState
        plugins={{
          statusState: pluginKey,
        }}
        render={({ statusState = {} as StatusState }) => {
          const { showStatusPickerAt } = statusState;
          if (typeof showStatusPickerAt !== 'number') {
            return null;
          }

          const target = findDomRefAtPos(
            showStatusPickerAt,
            domAtPos,
          ) as HTMLElement;

          const statusNode: any = editorView.state.doc.nodeAt(
            showStatusPickerAt,
          );

          if (!statusNode || statusNode.type.name !== 'status') {
            return null;
          }

          const { text, color, localId } = statusNode.attrs;

          return (
            <StatusPicker
              isNew={statusState.isNew}
              target={target}
              defaultText={text}
              defaultColor={color}
              defaultLocalId={localId}
              onSelect={(status: StatusType) => {
                updateStatus(status)(editorView);
              }}
              onTextChanged={(status: StatusType) => {
                updateStatus(status)(editorView);
              }}
              closeStatusPicker={() => {
                commitStatusPicker()(editorView);
              }}
              onEnter={() => {
                commitStatusPicker()(editorView);
              }}
            />
          );
        }}
      />
    );
  },
});

export interface StatusOptions {
  menuDisabled: boolean;
}

const decorateWithPluginOptions = (
  plugin: EditorPlugin,
  options: StatusOptions,
): EditorPlugin => {
  if (options.menuDisabled === true) {
    return plugin;
  }
  plugin.pluginsOptions = {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.status),
        description: formatMessage(messages.statusDescription),
        priority: 700,
        keywords: ['lozenge'],
        icon: () => <IconStatus label={formatMessage(messages.status)} />,
        action: createStatus(),
      },
    ],
  };
  return plugin;
};

const statusPlugin = (options: StatusOptions): EditorPlugin =>
  decorateWithPluginOptions(baseStatusPlugin(), options);

export default statusPlugin;
