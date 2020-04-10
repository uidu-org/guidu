import { liftTarget } from 'prosemirror-transform';
import { Command } from '../../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../analytics';

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

export function clearFormattingWithAnalytics(
  inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT,
): Command {
  return clearFormatting(inputMethod);
}

export function clearFormatting(
  inputMethod?: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT,
): Command {
  return function (state, dispatch): boolean {
    const { tr } = state;
    const formattingCleared: string[] = [];

    FORMATTING_MARK_TYPES.forEach((mark) => {
      const { from, to } = tr.selection;
      const markType = state.schema.marks[mark];

      if (markType && state.doc.rangeHasMark(from, to, markType)) {
        formattingCleared.push(formatTypes[mark]);
        tr.removeMark(from, to, markType);
      }
    });

    FORMATTING_NODE_TYPES.forEach((nodeName) => {
      const formattedNodeType = state.schema.nodes[nodeName];
      const { $from, $to } = tr.selection;
      tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
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
      });
    });

    tr.setStoredMarks([]);

    if (formattingCleared.length && inputMethod) {
      addAnalytics(state, tr, {
        action: ACTION.FORMATTED,
        eventType: EVENT_TYPE.TRACK,
        actionSubject: ACTION_SUBJECT.TEXT,
        actionSubjectId: ACTION_SUBJECT_ID.FORMAT_CLEAR,
        attributes: {
          inputMethod,
          formattingCleared,
        },
      });
    }

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}
