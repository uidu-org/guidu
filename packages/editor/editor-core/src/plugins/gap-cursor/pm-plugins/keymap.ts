import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import { createParagraphNear } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { arrow, deleteNode } from '../actions';
import { Direction } from '../direction';
import { GapCursorSelection } from '../selection';

export default function keymapPlugin(): SafePlugin {
  const map = {};

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common,
    (state, dispatch, view) => {
      const isInGapCursor = state.selection instanceof GapCursorSelection;
      // Only operate in gap cursor
      if (!isInGapCursor) {
        return false;
      }
      return createParagraphNear(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveLeft.common,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.LEFT, endOfTextblock)(state, dispatch, view);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveRight.common,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.RIGHT, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.UP, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.DOWN, endOfTextblock)(state, dispatch);
    },
    map,
  );

  // default PM's Backspace doesn't handle removing block nodes when cursor is after it
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common,
    deleteNode(Direction.BACKWARD),
    map,
  );

  // handle Delete key (remove node after the cursor)
  keymaps.bindKeymapWithCommand(
    keymaps.deleteKey.common,
    deleteNode(Direction.FORWARD),
    map,
  );

  return keymap(map) as SafePlugin;
}
