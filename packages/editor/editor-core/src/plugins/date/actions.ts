import { todayTimestampInUTC } from '@uidu/editor-common';
import { Fragment } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { Command } from '../../types';
import { TOOLBAR_MENU_TYPE } from '../insert-block/ui/ToolbarInsertBlock/types';
import { pluginKey } from './pm-plugins/plugin-key';
import { DateType } from './types';

export const insertDate =
  (date?: DateType, inputMethod?: TOOLBAR_MENU_TYPE) =>
  (state: EditorState, dispatch: (tr: Transaction) => void): boolean => {
    const { schema } = state;
    let timestamp: string;
    if (date) {
      timestamp = Date.UTC(date.year, date.month - 1, date.day).toString();
    } else {
      timestamp = todayTimestampInUTC();
    }

    const tr = state.tr;
    const { showDatePickerAt } = pluginKey.getState(state);

    if (!showDatePickerAt) {
      const dateNode = schema.nodes.date.createChecked({ timestamp });
      const textNode = state.schema.text(' ');
      const fragment = Fragment.fromArray([dateNode, textNode]);
      const { from, to } = state.selection;
      dispatch(
        tr
          .replaceWith(from, to, fragment)
          .setSelection(NodeSelection.create(tr.doc, state.selection.$from.pos))
          .scrollIntoView(),
      );
      return true;
    }

    if (state.doc.nodeAt(showDatePickerAt)) {
      dispatch(
        tr
          .setNodeMarkup(showDatePickerAt, schema.nodes.date, {
            timestamp,
          })
          .setSelection(Selection.near(tr.doc.resolve(showDatePickerAt + 2)))
          .setMeta(pluginKey, { showDatePickerAt: null })
          .scrollIntoView(),
      );
      return true;
    }

    return false;
  };

export const setDatePickerAt =
  (showDatePickerAt: number | null) =>
  (state: EditorState, dispatch: (tr: Transaction) => void): boolean => {
    dispatch(state.tr.setMeta(pluginKey, { showDatePickerAt }));
    return true;
  };

export const closeDatePicker = (): Command => (state, dispatch) => {
  const { showDatePickerAt } = pluginKey.getState(state);

  if (!showDatePickerAt) {
    return false;
  }

  if (dispatch) {
    dispatch(
      state.tr
        .setMeta(pluginKey, { showDatePickerAt: null })
        .setSelection(
          Selection.near(state.tr.doc.resolve(showDatePickerAt + 2)),
        ),
    );
  }
  return false;
};

export const openDatePicker = (): Command => (state, dispatch) => {
  const { $from } = state.selection;
  const node = state.doc.nodeAt($from.pos);
  if (node && node.type.name === state.schema.nodes.date.name) {
    const showDatePickerAt = $from.pos;
    if (dispatch) {
      dispatch(
        state.tr
          .setMeta(pluginKey, { showDatePickerAt })
          .setSelection(NodeSelection.create(state.doc, showDatePickerAt)),
      );
    }
  }
  return false;
};
