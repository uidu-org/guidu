import { EditorState, TextSelection } from 'prosemirror-state';
import { CommandDispatch } from '../../../types';
import {
  forEachLine,
  getLineInfo,
  getLinesFromSelection,
  getStartOfCurrentLine,
} from './line-handling';

/**
 * Return the current indentation level
 * @param indentText - Text in the code block that represent an indentation
 * @param indentSize - Size of the indentation token in a string
 */
function getIndentLevel(indentText: string, indentSize: number) {
  if (indentSize === 0 || indentText.length === 0) {
    return 0;
  }

  return indentText.length / indentSize;
}

export function indent(state: EditorState, dispatch?: CommandDispatch) {
  const { text, start } = getLinesFromSelection(state);
  const { tr, selection } = state;
  forEachLine(text, (line, offset) => {
    const { indentText, indentToken } = getLineInfo(line);
    const indentLevel = getIndentLevel(indentText, indentToken.size);

    const indentToAdd = indentToken.token.repeat(
      indentToken.size - (indentText.length % indentToken.size) ||
        indentToken.size,
    );
    tr.insertText(indentToAdd, tr.mapping.map(start + offset, -1));

    if (!selection.empty) {
      tr.setSelection(
        TextSelection.create(
          tr.doc,
          tr.mapping.map(selection.from, -1),
          tr.selection.to,
        ),
      );
    }
  });
  if (dispatch) {
    dispatch(tr);
  }
  return true;
}

export function outdent(state: EditorState, dispatch?: CommandDispatch) {
  const { text, start } = getLinesFromSelection(state);
  const { tr } = state;
  forEachLine(text, (line, offset) => {
    const { indentText, indentToken } = getLineInfo(line);
    if (indentText) {
      const indentLevel = getIndentLevel(indentText, indentToken.size);

      const unindentLength =
        indentText.length % indentToken.size || indentToken.size;
      tr.delete(
        tr.mapping.map(start + offset),
        tr.mapping.map(start + offset + unindentLength),
      );
    }
  });
  if (dispatch) {
    dispatch(tr);
  }
  return true;
}

export function insertIndent(state: EditorState, dispatch: CommandDispatch) {
  const { text: textAtStartOfLine } = getStartOfCurrentLine(state);
  const { indentToken } = getLineInfo(textAtStartOfLine);
  const indentToAdd = indentToken.token.repeat(
    indentToken.size - (textAtStartOfLine.length % indentToken.size) ||
      indentToken.size,
  );
  dispatch(state.tr.insertText(indentToAdd));
  return true;
}

export function insertNewlineWithIndent(
  state: EditorState,
  dispatch?: CommandDispatch,
) {
  const { text: textAtStartOfLine } = getStartOfCurrentLine(state);
  const { indentText } = getLineInfo(textAtStartOfLine);
  if (indentText && dispatch) {
    dispatch(state.tr.insertText(`\n${indentText}`));
    return true;
  }
  return false;
}
