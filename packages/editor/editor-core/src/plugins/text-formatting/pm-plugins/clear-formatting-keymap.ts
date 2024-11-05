import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { clearFormatting } from '../commands/clear-formatting';

export function keymapPlugin(): Plugin {
  const list = {};
  keymaps.bindKeymapWithCommand(
    keymaps.clearFormatting.common,
    clearFormatting(),
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
