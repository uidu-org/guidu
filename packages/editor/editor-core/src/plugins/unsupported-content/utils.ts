import { Node as PMNode, Schema } from 'prosemirror-model';

export const traverseNode = (node: PMNode, schema: Schema): void => {
  let cxhtml = '';
  const { unsupportedInline, unsupportedBlock } = schema.nodes;
  if (node.attrs && node.attrs.cxhtml) {
    cxhtml = node.attrs.cxhtml;
  }

  if (node.type === unsupportedInline) {
  } else if (node.type === unsupportedBlock) {
  } else {
    node.content.forEach((node) => traverseNode(node, schema));
  }
};
