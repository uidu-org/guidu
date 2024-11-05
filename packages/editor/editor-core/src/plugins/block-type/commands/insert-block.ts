import { NodeType } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';

export const insertBlock = (
  state: EditorState,
  nodeType: NodeType,
  nodeName: string,
  start: number,
  end: number,
  attrs?: { [key: string]: any },
): Transaction | null => {
  // To ensure that match is done after HardBreak.
  const { hardBreak, codeBlock, listItem } = state.schema.nodes;
  const $pos = state.doc.resolve(start);
  if ($pos.nodeAfter.type !== hardBreak) {
    return null;
  }

  // To ensure no nesting is done. (unless we're inserting a codeBlock inside lists)
  if (
    $pos.depth > 1 &&
    !(nodeType === codeBlock && hasParentNodeOfType(listItem)(state.selection))
  ) {
    return null;
  }

  // Split at the start of autoformatting and delete formatting characters.
  let tr = state.tr.delete(start, end).split(start);
  let currentNode = tr.doc.nodeAt(start + 1);

  // If node has more content split at the end of autoformatting.
  let nodeHasMoreContent = false;
  tr.doc.nodesBetween(start, start + currentNode.nodeSize, (node, pos) => {
    if (!nodeHasMoreContent && node.type === hardBreak) {
      nodeHasMoreContent = true;
      tr = tr.split(pos + 1).delete(pos, pos + 1);
    }
  });
  if (nodeHasMoreContent) {
    currentNode = tr.doc.nodeAt(start + 1);
  }

  // Create new node and fill with content of current node.
  const { blockquote, paragraph } = state.schema.nodes;
  let content;
  let depth;
  if (nodeType === blockquote) {
    depth = 3;
    content = [paragraph.create({}, currentNode.content)];
  } else {
    depth = 2;
    content = currentNode.content;
  }
  const newNode = nodeType.create(attrs, content);

  // Add new node.
  tr = tr
    .setSelection(new NodeSelection(tr.doc.resolve(start + 1)))
    .replaceSelectionWith(newNode)
    .setSelection(new TextSelection(tr.doc.resolve(start + depth)));
  return tr;
};
