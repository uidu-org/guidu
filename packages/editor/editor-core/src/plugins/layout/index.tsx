import { layoutColumn, layoutSection } from '@uidu/adf-schema';
import * as React from 'react';
import { EditorPlugin } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
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
          const tr = insert(createDefaultLayoutSection(state));
          return addAnalytics(tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.LAYOUT,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT,
            },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  },
});

export default layoutPlugin;
