import { faColumns3 } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { layoutColumn, layoutSection } from '@uidu/adf-schema';
import React from 'react';
import { EditorPlugin } from '../../types';
import { FloatingToolbarConfig } from '../floating-toolbar/types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { createDefaultLayoutSection } from './actions';
import { default as createLayoutPlugin } from './pm-plugins/main';
import { pluginKey } from './pm-plugins/plugin-key';
import { LayoutState } from './pm-plugins/types';
import { buildToolbar } from './toolbar';

export { pluginKey };

const layoutPlugin = (layoutsConfig?: {
  allowBreakout: boolean;
  UNSAFE_addSidebarLayouts?: boolean;
}): EditorPlugin => ({
  name: 'layout',

  nodes() {
    return [
      { name: 'layoutSection', node: layoutSection },
      { name: 'layoutColumn', node: layoutColumn },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'layout',
        plugin: () => createLayoutPlugin(layoutsConfig),
      },
    ];
  },
  pluginsOptions: {
    floatingToolbar(state, intl): FloatingToolbarConfig | undefined {
      const { pos, allowBreakout, addSidebarLayouts } = pluginKey.getState(
        state,
      ) as LayoutState;
      if (pos !== null) {
        return buildToolbar(state, intl, pos, allowBreakout, addSidebarLayouts);
      }
      return undefined;
    },
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.columns),
        description: formatMessage(messages.columnsDescription),
        keywords: ['layout', 'section', 'column'],
        priority: 1100,
        icon: () => (
          <FontAwesomeIcon
            icon={faColumns3}
            label={formatMessage(messages.columns)}
          />
        ),
        action(insert, state) {
          const tr = insert(createDefaultLayoutSection(state));

          return tr;
        },
      },
    ],
  },
});

export default layoutPlugin;
