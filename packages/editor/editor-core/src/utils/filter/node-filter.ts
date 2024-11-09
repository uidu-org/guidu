import { ADFEntity, traverse } from '@uidu/adf-utils';
import { JSONDocNode } from '@uidu/editor-json-transformer';

export function removeMarks(node: ADFEntity) {
  let newNode = { ...node };
  delete newNode.marks;
  return newNode;
}

export function sanitizeNode(json: JSONDocNode): JSONDocNode {
  const sanitizedJSON = traverse(json as any, {
    text: (node) => {
      if (!node || !Array.isArray(node.marks)) {
        return node;
      }

      return {
        ...node,
        marks: node.marks.filter((mark) => mark.type !== 'typeAheadQuery'),
      };
    },
    emoji: removeMarks,
    mention: removeMarks,
    date: removeMarks,
    hardBreak: removeMarks,
    inlineCard: removeMarks,
  }) as JSONDocNode;

  return sanitizedJSON;
}
