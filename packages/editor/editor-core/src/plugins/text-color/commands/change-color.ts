import { Command } from '../../../types';
import { pluginKey } from '../pm-plugins/main';
import { getActiveColor } from '../utils/color';
import { removeColor } from './remove-color';
import { toggleColor } from './toggle-color';

export const changeColor =
  (color: string): Command =>
  (state, dispatch) => {
    const { textColor } = state.schema.marks;
    if (textColor) {
      const pluginState = pluginKey.getState(state);
      const activeColor = getActiveColor(state);

      if (pluginState.disabled) {
        return false;
      }

      if (color === pluginState.defaultColor) {
        removeColor()(state, dispatch);
        return true;
      }

      toggleColor(color)(state, dispatch);
      return true;
    }
    return false;
  };
