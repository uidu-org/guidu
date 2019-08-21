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
  `atlassian.editor.format.${blockTypeName}.${eventSource}`;
const tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo);

export default function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    trackAndInvoke(
      'atlassian.editor.newline.keyboard',
      commands.insertNewLineWithAnalytics,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    trackAndInvoke(
      'atlassian.editor.moveup.keyboard',
      commands.createNewParagraphAbove,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    trackAndInvoke(
      'atlassian.editor.movedown.keyboard',
      commands.createNewParagraphBelow,
    ),
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redo)!,
    trackAndInvoke('atlassian.editor.redo.keyboard', redo),
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.undo.common!,
    trackAndInvoke(
      'atlassian.editor.undo.keyboard',
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
