import { safeInsert } from '@uidu/prosemirror-utils';
import {
  EditorState,
  NodeSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { Command } from '../../types';
import { pluginKey } from './pm-plugins/plugin-key';
import { VideoType } from './types';

export const insertVideo =
  (video?: VideoType) =>
  (state: EditorState, dispatch: (tr: Transaction) => void): boolean => {
    const { schema, tr } = state;

    const videoNode = state.schema.nodes.video.createChecked(video);

    if (dispatch) {
      dispatch(safeInsert(videoNode)(state.tr));
    }

    return true;
  };

export const setVideoPickerAt =
  (showVideoPickerAt: number | null) =>
  (state: EditorState, dispatch: (tr: Transaction) => void): boolean => {
    dispatch(state.tr.setMeta(pluginKey, { showVideoPickerAt }));
    return true;
  };

export const closeVideoPicker = (): Command => (state, dispatch) => {
  const { showVideoPickerAt } = pluginKey.getState(state);

  if (!showVideoPickerAt) {
    return false;
  }

  if (dispatch) {
    dispatch(
      state.tr
        .setMeta(pluginKey, { showVideoPickerAt: null })
        .setSelection(
          Selection.near(state.tr.doc.resolve(showVideoPickerAt + 2)),
        ),
    );
  }
  return false;
};

export const openVideoPicker = (): Command => (state, dispatch) => {
  const { $from } = state.selection;
  const node = state.doc.nodeAt($from.pos);

  if (node && node.type.name === state.schema.nodes.video.name) {
    const showVideoPickerAt = $from.pos;
    if (dispatch) {
      dispatch(
        state.tr
          .setMeta(pluginKey, { showVideoPickerAt })
          .setSelection(NodeSelection.create(state.doc, showVideoPickerAt)),
      );
    }
  }
  return false;
};
