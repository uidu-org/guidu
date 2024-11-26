import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import { addColumnAfter, addColumnBefore } from 'prosemirror-tables';
import * as keymaps from '../../../keymaps';
import {
  clearMultipleCells,
  createTable,
  goToNextCell,
  moveCursorBackward,
  triggerUnlessTableHeader,
} from '../commands';
import { addRowAroundSelection } from '../commands/insert';

export function keymapPlugin(): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.nextCell.common, goToNextCell(1), list);
  keymaps.bindKeymapWithCommand(
    keymaps.previousCell.common,
    goToNextCell(-1),
    list,
  );
  keymaps.bindKeymapWithCommand(keymaps.toggleTable.common, createTable, list);
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common,
    clearMultipleCells(),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common,
    moveCursorBackward,
    list,
  );

  // Add row/column shortcuts
  keymaps.bindKeymapWithCommand(
    keymaps.addRowBefore.common,
    addRowAroundSelection('TOP'),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.addRowAfter.common,
    addRowAroundSelection('BOTTOM'),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.addColumnBefore.common,
    triggerUnlessTableHeader(addColumnBefore),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.addColumnAfter.common,
    addColumnAfter,
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
