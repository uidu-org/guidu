import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import { trackAndInvoke } from '../../../analytics';
import * as keymaps from '../../../keymaps';
import { INPUT_METHOD } from '../../analytics';
import {
  backspaceKeyCommand,
  deleteKeyCommand,
  enterKeyCommand,
  indentList,
  outdentList,
  toggleListCommandWithAnalytics,
} from '../commands';

export function keymapPlugin(): Plugin | undefined {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.toggleOrderedList)!,
    trackAndInvoke(
      'uidu.editor-core.format.list.numbered.keyboard',
      toggleListCommandWithAnalytics(INPUT_METHOD.KEYBOARD, 'orderedList'),
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.toggleBulletList)!,
    trackAndInvoke(
      'uidu.editor-core.format.list.bullet.keyboard',
      toggleListCommandWithAnalytics(INPUT_METHOD.KEYBOARD, 'bulletList'),
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.indentList.common!!,
    trackAndInvoke(
      'uidu.editor-core.format.list.indent.keyboard',
      indentList(INPUT_METHOD.KEYBOARD),
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.outdentList.common!!,
    trackAndInvoke(
      'uidu.editor-core.format.list.outdent.keyboard',
      outdentList(INPUT_METHOD.KEYBOARD),
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(keymaps.enter.common!!, enterKeyCommand, list);
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common!!,
    backspaceKeyCommand,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.deleteKey.common!!,
    deleteKeyCommand,
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
