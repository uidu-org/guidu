import { chainCommands } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import * as commands from '../../../commands';
import * as keymaps from '../../../keymaps';
import { keymap } from '../../../utils/keymap';
import { cleanUpAtTheStartOfDocument, insertBlockType } from '../commands';
import * as blockTypes from '../types';

const tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo);

export default function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common,
    commands.insertNewLine(),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common,
    commands.createNewParagraphAbove,
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common,
    commands.createNewParagraphBelow,
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redo),
    redo,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.undo.common,
    tryUndoInputRuleElseUndoHistory,
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redoBarred),
    commands.preventDefault(),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common,
    cleanUpAtTheStartOfDocument,
    list,
  );

  if (schema.nodes[blockTypes.BLOCK_QUOTE.nodeName]) {
    keymaps.bindKeymapWithCommand(
      keymaps.findShortcutByKeymap(keymaps.toggleBlockQuote),
      insertBlockType(blockTypes.BLOCK_QUOTE.name),
      list,
    );
  }

  return keymap(list);
}
