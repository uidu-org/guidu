import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { keymap } from '../../../utils/keymap';
import * as commands from '../commands/text-formatting';

export default function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  if (schema.marks.strong) {
    keymaps.bindKeymapWithCommand(
      keymaps.toggleBold.common,
      commands.toggleStrong(),
      list,
    );
  }

  if (schema.marks.em) {
    keymaps.bindKeymapWithCommand(
      keymaps.toggleItalic.common,
      commands.toggleEm(),
      list,
    );
  }

  if (schema.marks.code) {
    keymaps.bindKeymapWithCommand(
      keymaps.toggleCode.common,
      commands.toggleCode(),
      list,
    );
  }

  if (schema.marks.strike) {
    keymaps.bindKeymapWithCommand(
      keymaps.toggleStrikethrough.common,
      commands.toggleStrike(),
      list,
    );
  }

  if (schema.marks.underline) {
    keymaps.bindKeymapWithCommand(
      keymaps.toggleUnderline.common,
      commands.toggleUnderline(),
      list,
    );
  }

  return keymap(list);
}
