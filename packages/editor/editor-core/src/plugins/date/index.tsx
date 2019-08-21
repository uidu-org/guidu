import { date } from '@atlaskit/adf-schema';
import { todayTimestampInUTC } from '@uidu/editor-common';
import { findDomRefAtPos } from 'prosemirror-utils';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Loadable from 'react-loadable';
import WithPluginState from '../../components/WithPluginState';
import { EditorPlugin } from '../../types';
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

const DatePicker = Loadable({
  loader: () =>
    import(
      /* webpackChunkName:"@atlaskit-internal-editor-datepicker" */ './ui/DatePicker'
    ),
  loading: () => null,
});

export type DateType = {
  year: number;
  month: number;
  day?: number;
};

const datePlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'date', node: date }];
  },

  pmPlugins() {
    return [
      {
        name: 'date',
        plugin: options => {
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
            (editorDisabledPlugin || ({} as any)).editorDisabled
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
              onSelect={date => insertDate(date)(editorView.state, dispatch)}
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
          <FormattedMessage {...messages.date}>
            {(label: string) => <IconDate label={label} />}
          </FormattedMessage>
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
};

export default datePlugin;
