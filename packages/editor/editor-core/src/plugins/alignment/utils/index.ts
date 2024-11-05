import { EditorState } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { findParentNodeOfType } from 'prosemirror-utils';
import { AlignmentState } from '../types';

export const getActiveAlignment = (
  state: EditorState,
): AlignmentState | undefined => {
  if (state.selection instanceof CellSelection) {
    const marks: string[] = [];
    state.selection.forEachCell((cell) => {
      const mark = cell.firstChild.marks.filter(
        (m) => m.type === state.schema.marks.alignment,
      )[0];
      marks.push(mark ? (mark.attrs.align as AlignmentState) : 'start');
    });
    return marks.every((mark) => mark === marks[0])
      ? (marks[0] as AlignmentState)
      : 'start';
  }

  const node = findParentNodeOfType([
    state.schema.nodes.paragraph,
    state.schema.nodes.heading,
  ])(state.selection);
  const getMark =
    node &&
    node.node.marks.filter(
      (mark) => mark.type === state.schema.marks.alignment,
    )[0];

  return (getMark && (getMark.attrs.align as AlignmentState)) || 'start';
};
