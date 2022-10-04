import { keymap } from 'prosemirror-keymap';
import { NodeSelection, Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { closeVideoPicker, openVideoPicker } from '../actions';
import { getPluginState } from './main';

export function keymapPlugin(): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common,
    (state, dispatch) => {
      const videoPlugin = getPluginState(state);
      const isVideoNode =
        state.selection instanceof NodeSelection
          ? state.selection.node.type === state.schema.nodes.date
          : false;

      if (!isVideoNode) {
        return false;
      }

      if (!videoPlugin.showVideoPickerAt) {
        openVideoPicker()(state, dispatch);
        return true;
      }

      closeVideoPicker()(state, dispatch);
      return true;
    },
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
