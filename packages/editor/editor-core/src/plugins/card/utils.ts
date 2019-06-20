import { NodeType } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { CardAppearance } from './types';

export const appearanceForNodeType = (
  spec: NodeType,
): CardAppearance | undefined => {
  if (spec.name === 'inlineCard') {
    return 'inline';
  } else if (spec.name === 'blockCard') {
    return 'block';
  }
  return undefined;
};

export const selectedCardAppearance = (state: EditorState) =>
  state.selection instanceof NodeSelection &&
  appearanceForNodeType(state.selection.node.type);
