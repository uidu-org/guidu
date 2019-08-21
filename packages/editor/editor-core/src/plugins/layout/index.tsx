import { layoutColumn, layoutSection } from '@atlaskit/adf-schema';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EditorPlugin } from '../../types';
import { FloatingToolbarConfig } from '../floating-toolbar/types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconLayout } from '../quick-insert/assets';
import { createDefaultLayoutSection } from './actions';
import {
  default as createLayoutPlugin,
  LayoutState,
  pluginKey,
} from './pm-plugins/main';
import { buildToolbar } from './toolbar';

export { pluginKey };

const layoutPlugin = (): EditorPlugin => ({
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
        icon: () => (
          <FormattedMessage {...messages.columns}>
            {(label: string) => <IconLayout label={label} />}
          </FormattedMessage>
        ),
        action(insert, state) {
          return insert(createDefaultLayoutSection(state));
        },
      },
    ],
  },
});

export default layoutPlugin;
