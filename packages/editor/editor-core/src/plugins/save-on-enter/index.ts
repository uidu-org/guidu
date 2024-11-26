import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import { CommandDispatch } from '@uidu/editor-common/types';
import { keymap } from 'prosemirror-keymap';
import { ResolvedPos } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { insertNewLine } from '../../commands';
import { Dispatch } from '../../event-dispatcher';

export function createPlugin(
  eventDispatch: Dispatch,
  onSave?: (editorView: EditorView) => void,
): SafePlugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    'Shift-Enter': (state, dispatch, editorView) => {
      insertNewLine(state, dispatch, editorView);
      return true;
    },
    Enter(
      state: EditorState,
      _dispatch: CommandDispatch,
      editorView: EditorView,
    ) {
      if (canSaveOnEnter(editorView)) {
        onSave(editorView);
        return true;
      }
      return false;
    },
  }) as SafePlugin;
}

function isEmptyAtCursor($cursor: ResolvedPos) {
  const { content } = $cursor.parent;
  return !(content && content.size);
}

function canSaveOnEnter(editorView: EditorView) {
  const { $cursor } = editorView.state.selection as TextSelection;
  const { paragraph } = editorView.state.schema.nodes;
  return !$cursor || ($cursor.parent.type === paragraph && $cursor.depth === 1);
}

const saveOnEnterPlugin = (onSave?) => ({
  name: 'saveOnEnter',

  pmPlugins() {
    return [
      {
        name: 'saveOnEnter',
        plugin: ({ dispatch }) => createPlugin(dispatch, onSave),
      },
    ];
  },
});

export default saveOnEnterPlugin;
