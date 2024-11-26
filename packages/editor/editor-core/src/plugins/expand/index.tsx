import { expand, nestedExpand } from '@uidu/adf-schema';
import React from 'react';
import { EditorPlugin, EditorProps } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconExpand } from '../quick-insert/assets';
import { createExpandNode } from './commands';
import { expandKeymap } from './pm-plugins/keymap';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

interface ExpandPluginOptions {
  allowInsertion?: boolean;
}

const expandPlugin = (options?: ExpandPluginOptions): EditorPlugin => ({
  name: 'expand',

  nodes() {
    return [
      { name: 'expand', node: expand },
      { name: 'nestedExpand', node: nestedExpand },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'expand',
        plugin: ({ dispatch, reactContext }) => {
          return createPlugin(dispatch, reactContext);
        },
      },
      {
        name: 'expandKeymap',
        plugin: expandKeymap,
      },
    ];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig,

    quickInsert: ({ formatMessage }) => {
      if (options && options.allowInsertion !== true) {
        return [];
      }
      return [
        {
          title: formatMessage(messages.expand),
          description: formatMessage(messages.expandDescription),
          priority: 600,
          icon: () => <IconExpand label={formatMessage(messages.expand)} />,
          action(insert, state) {
            const node = createExpandNode(state);
            const tr = insert(node);
            return tr;
          },
        },
      ];
    },
  },
});

export default expandPlugin;
export { pluginKey } from './pm-plugins/plugin-factory';
export type { ExpandPluginState } from './types';

export function isExpandInsertionEnabled({ allowExpand }: EditorProps) {
  if (allowExpand && typeof allowExpand === 'object') {
    return !!allowExpand.allowInsertion;
  }

  return false;
}
