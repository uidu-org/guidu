import { Node as PmNode, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Selection } from 'prosemirror-state';
import {
  findParentNodeOfType,
  findSelectedNodeOfType,
  isNodeSelection,
} from 'prosemirror-utils';

type ExtensionNode =
  | {
      node: PmNode;
      pos: number;
    }
  | undefined;

export const getExtensionNode = (state: EditorState): ExtensionNode => {
  const { selection } = state;
  const { extension, inlineExtension, bodiedExtension } = state.schema.nodes;

  if (
    isNodeSelection(selection) &&
    findSelectedNodeOfType([extension, bodiedExtension, inlineExtension])(
      selection,
    )
  ) {
    return {
      node: (selection as NodeSelection).node,
      pos: selection.$from.pos,
    };
  }

  return findParentNodeOfType([extension, inlineExtension, bodiedExtension])(
    selection,
  );
};

export const isSelectionNodeExtension = (
  selection: Selection,
  schema: Schema,
): boolean => {
  return (
    selection instanceof NodeSelection &&
    (selection.node.type === schema.nodes.inlineExtension ||
      selection.node.type === schema.nodes.extension ||
      selection.node.type === schema.nodes.bodiedExtension)
  );
};
