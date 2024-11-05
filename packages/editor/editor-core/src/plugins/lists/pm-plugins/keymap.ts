import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import {
  backspaceKeyCommand,
  deleteKeyCommand,
  enterKeyCommand,
  indentList,
  outdentList,
  toggleListCommand,
} from '../commands';

export function keymapPlugin(): Plugin | undefined {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.toggleOrderedList),
    toggleListCommand('orderedList'),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.toggleBulletList),
    toggleListCommand('bulletList'),
    list,
  );
  keymaps.bindKeymapWithCommand(keymaps.indentList.common, indentList(), list);
  keymaps.bindKeymapWithCommand(
    keymaps.outdentList.common,
    outdentList(),
    list,
  );
  keymaps.bindKeymapWithCommand(keymaps.enter.common, enterKeyCommand, list);
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common,
    backspaceKeyCommand,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.deleteKey.common,
    deleteKeyCommand,
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
