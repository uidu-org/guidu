import {
  EditorState,
  Transaction,
  NodeSelection,
  Selection,
} from 'prosemirror-state';
import { todayTimestampInUTC } from '@atlaskit/editor-common';
import { pluginKey } from './plugin';
import { DateType } from './index';
import { Command } from '../../types';

export const insertDate = (date?: DateType) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean => {
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
    dispatch(
      tr
        .replaceSelectionWith(dateNode)
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

export const setDatePickerAt = (showDatePickerAt: number | null) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean => {
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
