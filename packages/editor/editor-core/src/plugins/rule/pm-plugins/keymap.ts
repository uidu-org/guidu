import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import * as commands from '../../../commands';
import * as keymaps from '../../../keymaps';

export function keymapPlugin(): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.insertRule.common,
    commands.insertRule(),
    list,
  );

  keymaps.bindKeymapWithCommand(keymaps.escape.common, () => true, list);

  return keymap(list);
}

export default keymapPlugin;
