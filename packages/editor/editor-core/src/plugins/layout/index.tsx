import * as React from 'react';
import { layoutSection, layoutColumn } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import { FloatingToolbarConfig } from '../floating-toolbar/types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import {
  default as createLayoutPlugin,
  pluginKey,
  LayoutState,
} from './pm-plugins/main';
import { buildToolbar } from './toolbar';
import { createDefaultLayoutSection } from './actions';
import { IconLayout } from '../quick-insert/assets';

export { pluginKey };

export default {
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
        plugin: ({ props }) => createLayoutPlugin(props.allowLayouts),
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
        icon: () => <IconLayout label={formatMessage(messages.columns)} />,
        action(insert, state) {
          return insert(createDefaultLayoutSection(state));
        },
      },
    ],
  },
} as EditorPlugin;
