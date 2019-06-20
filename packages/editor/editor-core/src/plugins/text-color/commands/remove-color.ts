import { TextSelection } from 'prosemirror-state';
import { pluginKey, ACTIONS } from '../pm-plugins/main';
import { Command } from '../../../types';

export const removeColor = (): Command => (state, dispatch) => {
  const { textColor } = state.schema.marks;
  const { from, to, $cursor } = state.selection as TextSelection;

  let tr = state.tr;

  if ($cursor) {
    tr = state.tr.removeStoredMark(textColor);
  } else {
    tr = state.tr.removeMark(from, to, textColor);
  }
  if (dispatch) {
    dispatch(tr.setMeta(pluginKey, { action: ACTIONS.RESET_COLOR }));
  }
  return true;
};
