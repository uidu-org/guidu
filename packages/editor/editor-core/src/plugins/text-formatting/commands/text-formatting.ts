import { Selection, TextSelection } from 'prosemirror-state';
import { Command } from '../../../types';
import { applyMarkOnRange, toggleMark } from '../../../utils/commands';
import { INPUT_METHOD } from '../../analytics';
import { hasCode, markActive } from '../utils';

export const moveRight = (): Command => (state, dispatch) => {
  const { code } = state.schema.marks;
  const { empty, $cursor } = state.selection as TextSelection;
  if (!empty || !$cursor) {
    return false;
  }
  const { storedMarks } = state.tr;
  if (code) {
    const insideCode = markActive(state, code.create());
    const currentPosHasCode = state.doc.rangeHasMark(
      $cursor.pos,
      $cursor.pos,
      code,
    );
    const nextPosHasCode = state.doc.rangeHasMark(
      $cursor.pos,
      $cursor.pos + 1,
      code,
    );

    const exitingCode =
      !currentPosHasCode &&
      !nextPosHasCode &&
      (!storedMarks || !!storedMarks.length);
    const enteringCode =
      !currentPosHasCode &&
      nextPosHasCode &&
      (!storedMarks || !storedMarks.length);

    // entering code mark (from the left edge): don't move the cursor, just add the mark
    if (!insideCode && enteringCode) {
      if (dispatch) {
        dispatch(state.tr.addStoredMark(code.create()));
      }
      return true;
    }

    // exiting code mark: don't move the cursor, just remove the mark
    if (insideCode && exitingCode) {
      if (dispatch) {
        dispatch(state.tr.removeStoredMark(code));
      }
      return true;
    }
  }

  return false;
};

export const moveLeft = (): Command => (state, dispatch) => {
  const { code } = state.schema.marks;
  const { empty, $cursor } = state.selection as TextSelection;
  if (!empty || !$cursor) {
    return false;
  }

  const { storedMarks } = state.tr;
  if (code) {
    const insideCode = code && markActive(state, code.create());
    const currentPosHasCode = hasCode(state, $cursor.pos);
    const nextPosHasCode = hasCode(state, $cursor.pos - 1);
    const nextNextPosHasCode = hasCode(state, $cursor.pos - 2);

    const exitingCode =
      currentPosHasCode && !nextPosHasCode && Array.isArray(storedMarks);
    const atLeftEdge =
      nextPosHasCode &&
      !nextNextPosHasCode &&
      (storedMarks === null ||
        (Array.isArray(storedMarks) && !!storedMarks.length));
    const atRightEdge =
      ((exitingCode && Array.isArray(storedMarks) && !storedMarks.length) ||
        (!exitingCode && storedMarks === null)) &&
      !nextPosHasCode &&
      nextNextPosHasCode;
    const enteringCode =
      !currentPosHasCode &&
      nextPosHasCode &&
      Array.isArray(storedMarks) &&
      !storedMarks.length;

    // at the right edge: remove code mark and move the cursor to the left
    if (!insideCode && atRightEdge) {
      const tr = state.tr.setSelection(
        Selection.near(state.doc.resolve($cursor.pos - 1)),
      );

      if (dispatch) {
        dispatch(tr.removeStoredMark(code));
      }
      return true;
    }

    // entering code mark (from right edge): don't move the cursor, just add the mark
    if (!insideCode && enteringCode) {
      if (dispatch) {
        dispatch(state.tr.addStoredMark(code.create()));
      }
      return true;
    }

    // at the left edge: add code mark and move the cursor to the left
    if (insideCode && atLeftEdge) {
      const tr = state.tr.setSelection(
        Selection.near(state.doc.resolve($cursor.pos - 1)),
      );

      if (dispatch) {
        dispatch(tr.addStoredMark(code.create()));
      }
      return true;
    }

    // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark
    const isFirstChild = $cursor.index($cursor.depth - 1) === 0;
    if (insideCode && (exitingCode || (!$cursor.nodeBefore && isFirstChild))) {
      if (dispatch) {
        dispatch(state.tr.removeStoredMark(code));
      }
      return true;
    }
  }

  return false;
};

export type InputMethodToolbar = INPUT_METHOD.TOOLBAR;
export type InputMethodBasic =
  | InputMethodToolbar
  | INPUT_METHOD.SHORTCUT
  | INPUT_METHOD.FORMATTING;

export const toggleEm = (): Command => (state, dispatch) => {
  const { em } = state.schema.marks;
  if (em) {
    return toggleMark(em)(state, dispatch);
  }
  return false;
};

export const toggleStrike = (): Command => (state, dispatch) => {
  const { strike } = state.schema.marks;
  if (strike) {
    return toggleMark(strike)(state, dispatch);
  }
  return false;
};

export const toggleStrong = (): Command => (state, dispatch) => {
  const { strong } = state.schema.marks;
  if (strong) {
    return toggleMark(strong)(state, dispatch);
  }
  return false;
};

export const toggleUnderline = (): Command => (state, dispatch) => {
  const { underline } = state.schema.marks;
  if (underline) {
    return toggleMark(underline)(state, dispatch);
  }
  return false;
};

export const toggleSuperscript = (): Command => (state, dispatch) => {
  const { subsup } = state.schema.marks;
  if (subsup) {
    return toggleMark(subsup, { type: 'sup' })(state, dispatch);
  }
  return false;
};

export const toggleSubscript = (): Command => (state, dispatch) => {
  const { subsup } = state.schema.marks;
  if (subsup) {
    return toggleMark(subsup, { type: 'sub' })(state, dispatch);
  }
  return false;
};

export const toggleCode = (): Command => (state, dispatch) => {
  const { code } = state.schema.marks;
  if (code) {
    return toggleMark(code)(state, dispatch);
  }

  return false;
};

export const createInlineCodeFromTextInput =
  (from: number, to: number, text: string): Command =>
  (state, dispatch) => {
    if (state.selection.empty) {
      const { nodeBefore: before } = state.doc.resolve(from);
      const { nodeAfter: after } = state.doc.resolve(to);

      const hasTickBefore = before && before.text && before.text.endsWith('`');
      const hasTickAfter = after && after.text && after.text.startsWith('`');
      if (hasTickBefore && hasTickAfter) {
        let tr = state.tr.replaceRangeWith(
          from - 1,
          to + 1,
          state.schema.text(text),
        );

        if (dispatch) {
          const codeMark = state.schema.marks.code.create();
          tr = applyMarkOnRange(
            tr.mapping.map(from - 1),
            tr.mapping.map(to + 1),
            false,
            codeMark,
            tr,
          ).setStoredMarks([codeMark]);
          dispatch(tr);
        }
        return true;
      }
    }
    return false;
  };
