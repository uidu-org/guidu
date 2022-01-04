import { chainCommands } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { trackAndInvoke } from '../../../analytics';
import * as commands from '../../../commands';
import * as keymaps from '../../../keymaps';
import { keymap } from '../../../utils/keymap';
import { INPUT_METHOD } from '../../analytics';
import {
  cleanUpAtTheStartOfDocument,
  insertBlockTypesWithAnalytics,
} from '../../block-type/commands';
import * as blockTypes from '../types';

const analyticsEventName = (blockTypeName: string, eventSource: string) =>
  `uidu.editor-core.format.${blockTypeName}.${eventSource}`;
const tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo);

export default function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    trackAndInvoke(
      'uidu.editor-core.newline.keyboard',
      commands.insertNewLineWithAnalytics,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    trackAndInvoke(
      'uidu.editor-core.moveup.keyboard',
      commands.createNewParagraphAbove,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    trackAndInvoke(
      'uidu.editor-core.movedown.keyboard',
      commands.createNewParagraphBelow,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redo)!,
    trackAndInvoke('uidu.editor-core.redo.keyboard', redo),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.undo.common!,
    trackAndInvoke(
      'uidu.editor-core.undo.keyboard',
      tryUndoInputRuleElseUndoHistory,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redoBarred)!,
    commands.preventDefault(),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common!,
    cleanUpAtTheStartOfDocument,
    list,
  );

  if (schema.nodes[blockTypes.BLOCK_QUOTE.nodeName]) {
    keymaps.bindKeymapWithCommand(
      keymaps.findShortcutByKeymap(keymaps.toggleBlockQuote)!,
      trackAndInvoke(
        analyticsEventName(blockTypes.BLOCK_QUOTE.name, INPUT_METHOD.KEYBOARD),
        insertBlockTypesWithAnalytics(
          blockTypes.BLOCK_QUOTE.name,
          INPUT_METHOD.KEYBOARD,
        ),
      ),
      list,
    );
  }

  return keymap(list);
}
