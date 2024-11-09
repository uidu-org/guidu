import {
  CellAttributes,
  defaultSchema,
  inlineNodes,
  isSafeUrl,
} from '@uidu/adf-schema';
import { Mark as PMMark, Schema } from 'prosemirror-model';

export type ADFStage = 'stage0' | 'final';

export interface ADDoc {
  version: 1;
  type: 'doc';
  content: ADNode[];
}

export interface ADNode {
  type: string;
  attrs?: any;
  content?: ADNode[];
  marks?: ADMark[];
  text?: string;
}

export interface ADMark {
  type: string;
  attrs?: any;
}

export interface ADMarkSimple {
  type: {
    name: string;
  };
  attrs?: any;
}

/*
 * It's important that this order follows the marks rank defined here:
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Rank
 */
export const markOrder = [
  'link',
  'em',
  'strong',
  'textColor',
  'strike',
  'subsup',
  'underline',
  'code',
  'confluenceInlineComment',
  'annotation',
];

export const isSubSupType = (type: string): type is 'sub' | 'sup' => {
  return type === 'sub' || type === 'sup';
};

/*
 * Sorts mark by the predefined order above
 */
export const getMarksByOrder = (marks: PMMark[]) => {
  return [...marks].sort(
    (a, b) => markOrder.indexOf(a.type.name) - markOrder.indexOf(b.type.name),
  );
};

/*
 * Check if two marks are the same by comparing type and attrs
 */
export const isSameMark = (mark: PMMark | null, otherMark: PMMark | null) => {
  if (!mark || !otherMark) {
    return false;
  }

  return mark.eq(otherMark);
};

export const getValidDocument = (
  doc: ADDoc,
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): ADDoc | null => {
  const node = getValidNode(doc as ADNode, schema, adfStage);

  if (node.type === 'doc') {
    node.content = wrapInlineNodes(node.content);
    return node as ADDoc;
  }

  return null;
};

const wrapInlineNodes = (nodes: ADNode[] = []): ADNode[] => {
  return nodes.map((node) =>
    inlineNodes.has(node.type) ? { type: 'paragraph', content: [node] } : node,
  );
};

export const getValidContent = (
  content: ADNode[],
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): ADNode[] => {
  return content.map((node) => getValidNode(node, schema, adfStage));
};

const TEXT_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const RELATIVE_LINK = /^\//;

const flattenUnknownBlockTree = (
  node: ADNode,
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): ADNode[] => {
  const output: ADNode[] = [];
  let isPrevLeafNode = false;

  for (let i = 0; i < node.content!.length; i++) {
    const childNode = node.content![i];
    const isLeafNode = !(childNode.content && childNode.content.length);

    if (i > 0) {
      if (isPrevLeafNode) {
        output.push({ type: 'text', text: ' ' } as ADNode);
      } else {
        output.push({ type: 'hardBreak' } as ADNode);
      }
    }

    if (isLeafNode) {
      output.push(getValidNode(childNode, schema, adfStage));
    } else {
      output.push(...flattenUnknownBlockTree(childNode, schema, adfStage));
    }

    isPrevLeafNode = isLeafNode;
  }

  return output;
};

/**
 * Sanitize unknown node tree
 *
 * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-ImplementationdetailsforHCNGwebrenderer
 */
export const getValidUnknownNode = (node: ADNode): ADNode => {
  const { attrs = {}, content, text, type } = node;

  if (!content || !content.length) {
    const unknownInlineNode: ADNode = {
      type: 'text',
      text: text || attrs.text || `[${type}]`,
    };

    const { textUrl } = attrs;
    if (textUrl && isSafeUrl(textUrl)) {
      unknownInlineNode.marks = [
        {
          type: 'link',
          attrs: {
            href: textUrl,
          },
        } as ADMark,
      ];
    }

    return unknownInlineNode;
  }

  /*
   * Find leaf nodes and join them. If leaf nodes' parent node is the same node
   * join with a blank space, otherwise they are children of different branches, i.e.
   * we need to join them with a hardBreak node
   */
  return {
    type: 'unknownBlock',
    content: flattenUnknownBlockTree(node),
  };
};

const getValidMarks = (
  marks: ADMark[] | undefined,
  adfStage: ADFStage = 'final',
): ADMark[] | undefined => {
  if (marks && marks.length > 0) {
    return marks.reduce((acc, mark) => {
      const validMark = getValidMark(mark, adfStage);
      if (validMark) {
        acc.push(validMark);
      }

      return acc;
    }, [] as ADMark[]);
  }
  return marks;
};

/*
 * This method will validate a Node according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Nodes
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return 'unknown'
 *
 */
export const getValidNode = (
  originalNode: ADNode,
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): ADNode => {
  const { attrs, marks, text, type } = originalNode;
  let { content } = originalNode;

  const node: ADNode = {
    attrs,
    marks,
    text,
    type,
  };

  if (content) {
    node.content = content = getValidContent(content, schema, adfStage);
  }

  // If node type doesn't exist in schema, make it an unknown node
  if (!schema.nodes[type]) {
    return getValidUnknownNode(node);
  }

  if (type) {
    switch (type) {
      case 'doc': {
        const { version } = originalNode as ADDoc;
        if (version && content && content.length) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'codeBlock': {
        if (content) {
          content = content.reduce((acc: ADNode[], val) => {
            if (val.type === 'text') {
              acc.push({ type: val.type, text: val.text });
            }
            return acc;
          }, []);
        }
        if (attrs && attrs.language) {
          return {
            type,
            attrs,
            content,
            marks,
          };
        }
        return {
          type,
          content,
          marks,
        };
      }
      case 'date': {
        if (attrs && attrs.timestamp) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'video': {
        if (attrs && attrs.url) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'token': {
        if (attrs && attrs.id && attrs.name) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'emoji': {
        if (attrs && attrs.shortName) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'inlineExtension':
      case 'extension': {
        if (attrs && attrs.extensionType && attrs.extensionKey) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'inlineCard':
      case 'blockCard': {
        if (
          attrs &&
          ((attrs.url && isSafeUrl(attrs.url)) ||
            (attrs.data && attrs.data.url && isSafeUrl(attrs.data.url)))
        ) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'bodiedExtension': {
        if (attrs && attrs.extensionType && attrs.extensionKey && content) {
          return {
            type,
            attrs,
            content,
          };
        }
        break;
      }
      case 'hardBreak': {
        return {
          type,
        };
      }
      case 'media': {
        let mediaId = '';
        let mediaType = '';
        let mediaUrl = '';
        let mediaFile = {};

        if (attrs) {
          const { id, type, url, file } = attrs;
          mediaId = id;
          mediaType = type;
          mediaUrl = url;
          mediaFile = file;
        }

        if (mediaType === 'external' && !!mediaUrl) {
          const mediaAttrs: any = {
            type: mediaType,
            url: mediaUrl,
            width: attrs.width,
            height: attrs.height,
          };

          if (attrs.alt) {
            mediaAttrs.alt = attrs.alt;
          }

          return {
            type,
            attrs: mediaAttrs,
          };
        } else if (mediaId && mediaType) {
          const mediaAttrs: any = {
            type: mediaType,
            id: mediaId,
            file: mediaFile,
          };

          if (attrs.width) {
            mediaAttrs.width = attrs.width;
          }

          if (attrs.height) {
            mediaAttrs.height = attrs.height;
          }

          if (attrs.alt) {
            mediaAttrs.alt = attrs.alt;
          }

          return {
            type,
            attrs: mediaAttrs,
          };
        }
        break;
      }
      case 'mediaGroup': {
        if (
          Array.isArray(content) &&
          !content.some((e) => e.type !== 'media')
        ) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'mediaSingle': {
        if (
          Array.isArray(content) &&
          content.length === 1 &&
          content[0].type === 'media'
        ) {
          return {
            type,
            attrs,
            content,
            marks: getValidMarks(marks, adfStage),
          };
        }
        break;
      }
      case 'mention': {
        let mentionText = '';
        let mentionId;
        let mentionAccess;
        if (attrs) {
          const { text, displayName, id, accessLevel } = attrs;
          mentionText = text || displayName;
          mentionId = id;
          mentionAccess = accessLevel;
        }

        if (!mentionText) {
          mentionText = text || '@unknown';
        }

        if (mentionText && mentionId) {
          const mentionNode = {
            type,
            attrs: {
              id: mentionId,
              text: mentionText,
              accessLevel: '',
            },
          };
          if (mentionAccess) {
            mentionNode.attrs.accessLevel = mentionAccess;
          }

          return mentionNode;
        }
        break;
      }
      case 'paragraph': {
        return marks
          ? {
              type,
              content: content || [],
              marks,
            }
          : { type, content: content || [] };
      }
      case 'rule': {
        return {
          type,
        };
      }
      case 'text': {
        let { marks } = node;
        if (text) {
          return marks
            ? { type, text, marks: getValidMarks(marks, adfStage) }
            : { type, text };
        }
        break;
      }
      case 'heading': {
        if (attrs) {
          const { level } = attrs;
          const between = (x: number, a: number, b: number) => x >= a && x <= b;
          if (level && between(level, 1, 6)) {
            return marks
              ? {
                  type,
                  content,
                  marks,
                  attrs: {
                    level,
                  },
                }
              : {
                  type,
                  content,
                  attrs: {
                    level,
                  },
                };
          }
        }
        break;
      }
      case 'bulletList': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'orderedList': {
        if (content) {
          return {
            type,
            content,
            attrs: {
              order: attrs && attrs.order,
            },
          };
        }
        break;
      }
      case 'listItem': {
        if (content) {
          return {
            type,
            content: wrapInlineNodes(content),
          };
        }
        break;
      }
      case 'blockquote': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'panel': {
        const types = ['info', 'note', 'tip', 'success', 'warning', 'error'];
        if (attrs && content) {
          const { panelType } = attrs;
          if (types.indexOf(panelType) > -1) {
            return {
              type,
              attrs: { panelType },
              content,
            };
          }
        }
        break;
      }
      case 'layoutSection': {
        if (content) {
          return {
            type,
            marks,
            content,
          };
        }
        break;
      }
      case 'layoutColumn': {
        if (attrs && content) {
          if (attrs.width > 0 && attrs.width <= 100) {
            return {
              type,
              content,
              attrs,
            };
          }
        }
        break;
      }
      case 'table': {
        if (
          Array.isArray(content) &&
          content.length > 0 &&
          !content.some((e) => e.type !== 'tableRow')
        ) {
          return {
            type,
            content,
            attrs,
          };
        }
        break;
      }
      case 'tableRow': {
        if (
          Array.isArray(content) &&
          content.length > 0 &&
          !content.some(
            (e) => e.type !== 'tableCell' && e.type !== 'tableHeader',
          )
        ) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'tableCell':
      case 'tableHeader': {
        if (content) {
          const cellAttrs: CellAttributes = {};

          if (attrs) {
            if (attrs.colspan && attrs.colspan > 1) {
              cellAttrs.colspan = attrs.colspan;
            }

            if (attrs.rowspan && attrs.rowspan > 1) {
              cellAttrs.rowspan = attrs.rowspan;
            }

            if (attrs.background) {
              cellAttrs.background = attrs.background;
            }

            if (attrs.colwidth && Array.isArray(attrs.colwidth)) {
              cellAttrs.colwidth = attrs.colwidth;
            }
          }

          return {
            type,
            content: wrapInlineNodes(content),
            attrs: attrs ? cellAttrs : undefined,
          };
        }
        break;
      }
      case 'image': {
        if (attrs && attrs.src) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case 'placeholder': {
        if (attrs && typeof attrs.text !== 'undefined') {
          return { type, attrs };
        }

        break;
      }

      case 'expand':
      case 'nestedExpand': {
        return { type, attrs, content, marks };
      }
    }
  }

  return getValidUnknownNode(node);
};

/*
 * This method will validate a Mark according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Marks
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return null
 *
 */
export const getValidMark = (
  mark: ADMark,
  adfStage: ADFStage = 'final',
): ADMark | null => {
  const { attrs, type } = mark;

  if (type) {
    switch (type) {
      case 'code': {
        return {
          type,
        };
      }
      case 'em': {
        return {
          type,
        };
      }
      case 'link': {
        if (attrs) {
          const { href, url, __confluenceMetadata } = attrs;
          let linkHref = href || url;
          if (
            linkHref &&
            linkHref.indexOf(':') === -1 &&
            !RELATIVE_LINK.test(linkHref)
          ) {
            linkHref = `http://${linkHref}`;
          }

          const linkAttrs: any = {
            href: linkHref,
          };

          if (__confluenceMetadata) {
            linkAttrs.__confluenceMetadata = __confluenceMetadata;
          }

          if (linkHref && isSafeUrl(linkHref)) {
            return {
              type,
              attrs: linkAttrs,
            };
          }
        }
        break;
      }
      case 'strike': {
        return {
          type,
        };
      }
      case 'strong': {
        return {
          type,
        };
      }
      case 'subsup': {
        if (attrs && attrs['type']) {
          const subSupType = attrs['type'];
          if (isSubSupType(subSupType)) {
            return {
              type,
              attrs: {
                type: subSupType,
              },
            };
          }
        }
        break;
      }
      case 'textColor': {
        if (attrs && TEXT_COLOR_PATTERN.test(attrs.color)) {
          return {
            type,
            attrs,
          };
        }

        break;
      }
      case 'underline': {
        return {
          type,
        };
      }
    }
  }

  if (adfStage === 'stage0') {
    switch (type) {
      case 'confluenceInlineComment': {
        return {
          type,
          attrs,
        };
      }
      case 'annotation': {
        return {
          type,
          attrs,
        };
      }
    }
  }

  return null;
};
