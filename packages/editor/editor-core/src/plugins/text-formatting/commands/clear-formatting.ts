import { Node, NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { liftTarget } from 'prosemirror-transform';
import { Command } from '../../../types';
import { cellSelectionNodesBetween } from '../../../utils/cell-selection';
import { ACTION_SUBJECT_ID } from '../../analytics';

export const FORMATTING_NODE_TYPES = ['heading', 'codeBlock', 'blockquote'];
export const FORMATTING_MARK_TYPES = [
  'em',
  'code',
  'strike',
  'strong',
  'underline',
  'textColor',
  'subsup',
];

const formatTypes: Record<string, string> = {
  em: ACTION_SUBJECT_ID.FORMAT_ITALIC,
  code: ACTION_SUBJECT_ID.FORMAT_CODE,
  strike: ACTION_SUBJECT_ID.FORMAT_STRIKE,
  strong: ACTION_SUBJECT_ID.FORMAT_STRONG,
  underline: ACTION_SUBJECT_ID.FORMAT_UNDERLINE,
  textColor: ACTION_SUBJECT_ID.FORMAT_COLOR,
  subsup: 'subsup',
};

function clearNodeFormattingOnSelection(
  state: EditorState,
  tr: Transaction,
  formattedNodeType: NodeType,
  nodeName: string,
  formattingCleared: string[],
) {
  return function (node: Node, pos: number) {
    if (node.type === formattedNodeType) {
      if (formattedNodeType.isTextblock) {
        tr.setNodeMarkup(pos, state.schema.nodes.paragraph);
        formattingCleared.push(nodeName);
        return false;
      } else {
        // In case of panel or blockquote
        let fromPos = tr.doc.resolve(pos + 1);
        let toPos = tr.doc.resolve(pos + node.nodeSize - 1);
        const nodeRange = fromPos.blockRange(toPos);
        if (nodeRange) {
          const targetLiftDepth = liftTarget(nodeRange);
          if (targetLiftDepth || targetLiftDepth === 0) {
            formattingCleared.push(nodeName);
            tr.lift(nodeRange, targetLiftDepth!);
          }
        }
      }
    }
    return true;
  };
}

export function clearFormatting(): Command {
  return function (state, dispatch): boolean {
    const { tr } = state;
    const formattingCleared: string[] = [];

    FORMATTING_MARK_TYPES.forEach((mark) => {
      const { from, to } = tr.selection;
      const markType = state.schema.marks[mark];

      if (tr.selection instanceof CellSelection) {
        cellSelectionNodesBetween(tr.selection, tr.doc, (node, pos) => {
          if (
            markType &&
            state.doc.rangeHasMark(pos, pos + node.nodeSize, markType)
          ) {
            formattingCleared.push(formatTypes[mark]);
            tr.removeMark(pos, pos + node.nodeSize, markType);
          }
        });
      } else {
        if (markType && state.doc.rangeHasMark(from, to, markType)) {
          formattingCleared.push(formatTypes[mark]);
          tr.removeMark(from, to, markType);
        }
      }
    });

    FORMATTING_NODE_TYPES.forEach((nodeName) => {
      const formattedNodeType = state.schema.nodes[nodeName];
      const { $from, $to } = tr.selection;
      if (tr.selection instanceof CellSelection) {
        cellSelectionNodesBetween(
          tr.selection,
          tr.doc,
          clearNodeFormattingOnSelection(
            state,
            tr,
            formattedNodeType,
            nodeName,
            formattingCleared,
          ),
        );
      } else {
        tr.doc.nodesBetween(
          $from.pos,
          $to.pos,
          clearNodeFormattingOnSelection(
            state,
            tr,
            formattedNodeType,
            nodeName,
            formattingCleared,
          ),
        );
      }
    });

    tr.setStoredMarks([]);

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}
