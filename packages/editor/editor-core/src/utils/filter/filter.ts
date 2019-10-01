import { JSONDocNode, JSONNode } from '@uidu/editor-json-transformer';
import { Schema, Slice } from 'prosemirror-model';

const isBlockNode = (node: JSONNode, schema?: Schema): boolean => {
  if (!schema) {
    return false;
  }
  const nodeType = schema.nodes[node.type];
  if (!nodeType) {
    return false;
  }
  return nodeType.isBlock;
};

/**
 * Filters text (e.g. from code blocks) that include new lines - convert to hardBreaks
 */
const filterText = (acc: JSONNode[], node: JSONNode) => {
  const text = node.text;
  if (!text || node.type !== 'text') {
    return false;
  }
  const lines = text.split('\n');
  return lines.reduce((acc, line, index) => {
    if (index > 0) {
      acc.push({
        type: 'hardBreak',
      });
    }
    acc.push({
      ...node,
      text: line,
    });
    return acc;
  }, acc);
};

const filterContent = (
  content: JSONNode[],
  types: Set<string>,
  schema?: Schema,
  breakBetweenBlocks?: boolean,
) => {
  return content.reduce(
    (acc, node) => {
      if (types.has(node.type)) {
        if (node.content) {
          acc.push({
            ...node,
            content: filterContent(node.content, types),
          });
        } else if (node.type === 'text') {
          filterText(acc, node);
        } else {
          acc.push(node);
        }
      } else if (node.content) {
        if (breakBetweenBlocks && acc.length > 0 && isBlockNode(node, schema)) {
          // Seperate blocks with hard breaks
          acc.push({
            type: 'hardBreak',
          });
        }
        filterContent(node.content, types).forEach(child => acc.push(child));
      }

      return acc;
    },
    [] as JSONNode[],
  );
};

export const filterContentByType = (
  doc: JSONDocNode,
  types: Set<string>,
  schema?: Schema,
  breakBetweenBlocks?: boolean,
) => {
  const { content } = doc;

  if (!content) {
    return [];
  }

  return filterContent(content, types, schema, breakBetweenBlocks);
};

export const filterSliceByType = (
  slice: Slice,
  types: Set<string>,
  schema: Schema,
  breakBetweenBlocks?: boolean,
) => {
  const jsonSlice = slice.toJSON();
  if (!jsonSlice) {
    return slice;
  }
  const content = jsonSlice.content as JSONNode[];
  const filteredContent = filterContent(
    content,
    types,
    schema,
    breakBetweenBlocks,
  );
  return Slice.fromJSON(schema, {
    content: filteredContent,
    openStart: slice.openStart,
    openEnd: slice.openEnd,
  });
};
