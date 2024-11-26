import { faCalendar } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { date } from '@uidu/adf-schema';
import { todayTimestampInUTC } from '@uidu/editor-common';
import { findDomRefAtPos } from 'prosemirror-utils';
import React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../editor-disabled';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { insertDate, setDatePickerAt } from './actions';
import keymap from './pm-plugins/keymap';
import createDatePlugin from './pm-plugins/main';
import { pluginKey as datePluginKey } from './pm-plugins/plugin-key';
import { DateState } from './pm-plugins/types';
import { DateType } from './types';

const DatePicker = loadable(
  () =>
    import(
      /* webpackChunkName:"@uidu-internal-editor-datepicker" */ './ui/DatePicker'
    ),
);

const datePlugin = (): EditorPlugin => ({
  name: 'date',

  nodes() {
    return [{ name: 'date', node: date }];
  },

  pmPlugins() {
    return [
      {
        name: 'date',
        plugin: (options) => {
          DatePicker.preload();
          return createDatePlugin(options);
        },
      },
      {
        name: 'dateKeymap',
        plugin: () => {
          DatePicker.preload();
          return keymap();
        },
      },
    ];
  },

  contentComponent({ editorView }) {
    const { dispatch } = editorView;
    const domAtPos = editorView.domAtPos.bind(editorView);
    return (
      <WithPluginState
        plugins={{
          datePlugin: datePluginKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        render={({
          editorDisabledPlugin,
          datePlugin,
        }: {
          editorDisabledPlugin: EditorDisabledPluginState;
          datePlugin: DateState;
        }) => {
          const showDatePickerAt = datePlugin && datePlugin.showDatePickerAt;
          if (
            !showDatePickerAt ||
            (editorDisabledPlugin || {}).editorDisabled
          ) {
            return null;
          }

          const element = findDomRefAtPos(
            showDatePickerAt,
            domAtPos,
          ) as HTMLElement;

          return (
            <DatePicker
              key={showDatePickerAt}
              element={element}
              onSelect={(date?: DateType) =>
                insertDate(date)(editorView.state, dispatch)
              }
              closeDatePicker={() =>
                setDatePickerAt(null)(editorView.state, dispatch)
              }
            />
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.date),
        description: formatMessage(messages.dateDescription),
        priority: 800,
        keywords: ['time', 'today', '/'],
        keyshortcut: '//',
        icon: () => (
          <FontAwesomeIcon
            icon={faCalendar}
            label={formatMessage(messages.date)}
          />
        ),
        action(insert, state) {
          const dateNode = state.schema.nodes.date.createChecked({
            timestamp: todayTimestampInUTC(),
          });

          const tr = insert(dateNode, { selectInlineNode: true });
          return tr.setMeta(datePluginKey, {
            showDatePickerAt: tr.selection.from,
          });
        },
      },
    ],
  },
});

export default datePlugin;
