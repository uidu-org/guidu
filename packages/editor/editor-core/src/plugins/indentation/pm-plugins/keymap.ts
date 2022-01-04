import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import { trackAndInvoke } from '../../../analytics';
import * as keymaps from '../../../keymaps';
import { isTextSelection } from '../../../utils';
import { indent, outdent } from '../commands';

export function keymapPlugin(): Plugin | undefined {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.indent)!,
    trackAndInvoke('uidu.editor-core.format.block.indent.keyboard', indent),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.outdent)!,
    trackAndInvoke('uidu.editor-core.format.block.outdent.keyboard', outdent),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.findShortcutByKeymap(keymaps.backspace)!,
    trackAndInvoke(
      'uidu.editor-core.format.block.outdent.keyboard.alt',
      (state, dispatch) => {
        const { selection } = state;
        if (
          isTextSelection(selection) &&
          selection.$cursor &&
          selection.$cursor.parentOffset === 0
        ) {
          return dispatch ? outdent(state, dispatch) : false;
        }
        return false;
      },
    ),
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
