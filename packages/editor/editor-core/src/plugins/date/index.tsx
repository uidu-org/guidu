import loadable from '@loadable/component';
import { date } from '@uidu/adf-schema';
import { todayTimestampInUTC } from '@uidu/editor-common';
import { findDomRefAtPos } from 'prosemirror-utils';
import * as React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../editor-disabled';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconDate } from '../quick-insert/assets';
import { insertDate, setDatePickerAt } from './actions';
import keymap from './keymap';
import createDatePlugin, {
  DateState,
  pluginKey as datePluginKey,
} from './plugin';

const DatePicker = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-editor-datepicker" */ './ui/DatePicker'
  ),
);

export type DateType = {
  year: number;
  month: number;
  day?: number;
};

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
        icon: () => <IconDate label={formatMessage(messages.date)} />,
        action(insert, state) {
          const dateNode = state.schema.nodes.date.createChecked({
            timestamp: todayTimestampInUTC(),
          });

          const tr = insert(dateNode, { selectInlineNode: true });
          addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.DATE,
            eventType: EVENT_TYPE.TRACK,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
          });
          return tr.setMeta(datePluginKey, {
            showDatePickerAt: tr.selection.from,
          });
        },
      },
    ],
  },
});

export default datePlugin;
