import { Node as PMNode, Schema } from 'prosemirror-model';

const whitelistedAttributes = [
  'align',
  'annotationType',
  'extensionKey',
  'extensionType',
  'layout',
  'type',
  'localId',
  'mode',
  'language',
  'timestamp',
  'state',
  'originalWidth',
  'originalHeight',
  'height',
  'width',
  'shortName',
  'level',
  'userType',
  'order',
  'panelType',
  'color',
  'style',
  'isNumberColumnEnabled',
  'colspan',
  'rowspan',
  'colwidth',
  'background',
];

function concatAncestorHierarchy(node: PMNode, ancestoryHierarchy?: string) {
  const { name } = node.type;
  // Space concatenator used to reduce analytics payload size
  return ancestoryHierarchy ? `${ancestoryHierarchy} ${name}` : name;
}

const sanitizeMarks = (marks: { [key: string]: any }[] = []) => {
  let sanitizedMarks: { [key: string]: any }[] = [];
  marks.forEach((mark) => {
    if (mark.attrs) {
      const attrs = sanitizeAttributes(mark.attrs);
      sanitizedMarks.push({ ...mark, attrs });
    } else {
      sanitizedMarks.push({ ...mark });
    }
  });
  return sanitizedMarks;
};

const sanitizeAttributes = (attrs: {} = {}) => {
  let sanitizedAttrs: { [key: string]: any } = Object.assign({}, attrs);
  Object.keys(attrs)
    .filter((key) => !whitelistedAttributes.includes(key))
    .forEach((key) => (sanitizedAttrs[key] = ''));
  return sanitizedAttrs;
};

export const findAndTrackUnsupportedContentNodes = (
  node: PMNode,
  schema: Schema,
  ancestorHierarchy = '',
): void => {
  const { type: nodeType, marks: nodeMarks } = node;
  const { unsupportedMark, unsupportedNodeAttribute } = schema.marks;
  const { unsupportedInline, unsupportedBlock } = schema.nodes;
  const parentType = ancestorHierarchy.split(' ').pop() || '';
  if (nodeMarks.length) {
    nodeMarks.forEach((mark) => {
      if (mark.type === unsupportedMark) {
        const { originalValue } = mark.attrs || {};
        const sanitizedAttrs = sanitizeAttributes(originalValue.attrs) || {};
        const { type } = (originalValue || {}) as { type?: string };
        const unsupportedNode = {
          type: type || '',
          ancestry: ancestorHierarchy,
          parentType: parentType,
          marks: [],
          attrs: sanitizedAttrs || {},
        };
        fireUnsupportedEvent(unsupportedNode);
      } else if (mark.type === unsupportedNodeAttribute) {
        const { unsupported } = mark.attrs || {};
        const sanitizedAttrs = sanitizeAttributes(unsupported) || {};
        const unsupportedNodeAttribute = {
          type: nodeType.name || '',
          ancestry: ancestorHierarchy,
          parentType: parentType,
          marks: [],
          attrs: sanitizedAttrs || {},
        };
        fireUnsupportedEvent(unsupportedNodeAttribute);
      }
    });
  }
  if (nodeType === unsupportedInline || nodeType === unsupportedBlock) {
    const { originalValue } = node.attrs || {};
    const { marks } = originalValue || [];
    const { attrs } = originalValue || {};
    const { type } = (originalValue || {}) as { type?: string };
    const unsupportedNode = {
      type: type || '',
      ancestry: ancestorHierarchy,
      parentType: parentType,
      marks: sanitizeMarks(marks) || [],
      attrs: sanitizeAttributes(attrs) || {},
    };
    fireUnsupportedEvent(unsupportedNode);
  } else {
    // Recursive check for nested content
    node.content.forEach((childNode) =>
      findAndTrackUnsupportedContentNodes(
        childNode,
        schema,
        concatAncestorHierarchy(node, ancestorHierarchy),
      ),
    );
  }
};

export const fireUnsupportedEvent = (
  unsupportedNode: {} = {},
  errorCode?: string,
) => {
  let attrs: {
    unsupportedNode: Record<string, any>;
    errorCode?: String;
  } = {
    unsupportedNode: unsupportedNode,
  };
  if (errorCode) {
    attrs.errorCode = errorCode;
  }
};
