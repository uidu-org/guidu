import loadable from '@loadable/component';
import { Fragment, Node } from 'prosemirror-model';
import * as React from 'react';
import Blockquote from './blockquote';
import BodiedExtension, {
  Props as BodiedExtensionProps,
} from './bodiedExtension';
import BulletList from './bulletList';
import DecisionList from './decisionList';
import Doc from './doc';
import Extension, { Props as ExtensionProps } from './extension';
import HardBreak from './hardBreak';
import Heading from './heading';
import Image from './image';
import InlineExtension, {
  Props as InlineExtensionProps,
} from './inlineExtension';
import LayoutColumn from './layoutColumn';
import LayoutSection from './layoutSection';
import ListItem from './listItem';
import MediaSingle from './mediaSingle';
import OrderedList from './orderedList';
import Panel from './panel';
import Paragraph from './paragraph';
import Placeholder from './placeholder';
import Rule from './rule';
import Table from './table';
import { TableCell, TableHeader } from './tableCell';
import TableRow from './tableRow';
import TaskList from './taskList';
import UnknownBlock from './unknownBlock';

const CodeBlock = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_CodeBlock" */ './codeBlock'
  ),
);
const TaskItem = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_TaskItem" */ './taskItem'
  ),
);
const DecisionItem = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_DecisionItem" */ './decisionItem'
  ),
);
const Date = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_Date" */ './date'
  ),
);
const Status = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_Status" */ './status'
  ),
);
const Emoji = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_Emoji" */ './emoji'
  ),
);
const InlineCard = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_InlineCard" */ './inlineCard'
  ),
);
const BlockCard = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_BlockCard" */ './blockCard'
  ),
);
const Media = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_Media" */ './media'
  ),
);
const MediaGroup = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_MediaGroup" */ './mediaGroup'
  ),
);
const Mention = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-renderer-node_Mention" */ './mention'
  ),
);

export const nodeToReact: { [key: string]: React.ComponentType<any> } = {
  blockquote: Blockquote,
  bulletList: BulletList,
  blockCard: BlockCard,
  codeBlock: CodeBlock,
  date: Date,
  decisionItem: DecisionItem,
  decisionList: DecisionList,
  doc: Doc,
  emoji: Emoji,
  extension: Extension,
  bodiedExtension: BodiedExtension,
  hardBreak: HardBreak,
  heading: Heading,
  image: Image,
  inlineCard: InlineCard,
  inlineExtension: InlineExtension,
  layoutSection: LayoutSection,
  layoutColumn: LayoutColumn,
  listItem: ListItem,
  media: Media,
  mediaGroup: MediaGroup,
  mediaSingle: MediaSingle,
  mention: Mention,
  orderedList: OrderedList,
  panel: Panel,
  paragraph: Paragraph,
  placeholder: Placeholder,
  rule: Rule,
  status: Status,
  taskItem: TaskItem,
  taskList: TaskList,
  table: Table,
  tableCell: TableCell,
  tableHeader: TableHeader,
  tableRow: TableRow,
  unknownBlock: UnknownBlock,
};

export const toReact = (node: Node): React.ComponentType<any> => {
  return nodeToReact[node.type.name];
};

export interface TextWrapper {
  type: {
    name: 'textWrapper';
  };
  content: Node[];
}

export interface NodeSimple {
  type: {
    name: string;
  };
  attrs?: any;
  text?: string;
}

/*
 *  Wraps adjacent textnodes in a textWrapper
 *
 *  Input:
 *  [
 *    {
 *      type: 'text',
 *      text: 'Hello'
 *    },
 *    {
 *      type: 'text',
 *      text: 'World!',
 *      marks: [
 *        {
 *          type: 'strong'
 *        }
 *      ]
 *    }
 *  ]
 *
 *  Output:
 *  [
 *    {
 *      type: 'textWrapper',
 *      content: [
 *        {
 *          type: 'text',
 *          text: 'Hello'
 *        },
 *        {
 *          type: 'text',
 *          text: 'World!',
 *          marks: [
 *            {
 *              type: 'strong'
 *            }
 *          ]
 *        }
 *      ]
 *    }
 *  ]
 */
export const mergeTextNodes = (nodes: (Node | NodeSimple)[]) => {
  return nodes.reduce<(TextWrapper | Node | NodeSimple)[]>((acc, current) => {
    if (!isText(current.type.name)) {
      acc.push(current);
      return acc;
    }

    // Append node to previous node, if it was a text wrapper
    if (acc.length > 0 && isTextWrapper(acc[acc.length - 1])) {
      (acc[acc.length - 1] as TextWrapper).content!.push(current as Node);
    } else {
      acc.push({
        type: {
          name: 'textWrapper',
        },
        content: [current],
      } as TextWrapper);
    }

    return acc;
  }, []);
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};

export const isTextWrapper = (
  node: Node | TextWrapper | NodeSimple,
): node is TextWrapper => {
  return node.type.name === 'textWrapper';
};

const whitespaceRegex = /^\s*$/;

/**
 * Detects whether a fragment contains a single paragraph node
 * whose content satisfies the condition for an emoji block
 */
export const isEmojiDoc = (doc: Fragment): boolean => {
  if (doc.childCount !== 1) {
    return false;
  }
  const parentNodes: Node[] = [];
  doc.forEach((child) => parentNodes.push(child));
  const node = parentNodes[0];
  return node.type.name === 'paragraph' && isEmojiBlock(node.content);
};

const isEmojiBlock = (pnode: Fragment): boolean => {
  const content: Node[] = [];
  // Optimisation for long documents - worst case block will be space-emoji-space
  if (pnode.childCount > 7) {
    return false;
  }
  pnode.forEach((child) => content.push(child));
  let emojiCount = 0;
  for (let i = 0; i < content.length; ++i) {
    const node = content[i];
    switch (node.type.name) {
      case 'text':
        if (node.text && !node.text.match(whitespaceRegex)) {
          return false;
        }
        continue;
      case 'emoji':
        if (++emojiCount > 3) {
          return false;
        }
        continue;
      default:
        // Only text and emoji nodes are allowed
        return false;
    }
  }
  return emojiCount > 0;
};

export {
  Blockquote,
  BodiedExtension,
  BodiedExtensionProps,
  BulletList,
  BlockCard,
  CodeBlock,
  Date,
  DecisionItem,
  DecisionList,
  Doc,
  Emoji,
  Extension,
  ExtensionProps,
  HardBreak,
  Heading,
  ListItem,
  Image,
  InlineCard,
  InlineExtension,
  InlineExtensionProps,
  LayoutSection,
  LayoutColumn,
  Media,
  MediaGroup,
  MediaSingle,
  Mention,
  OrderedList,
  Panel,
  Paragraph,
  Placeholder,
  Rule,
  Status,
  TaskItem,
  TaskList,
  Table,
  TableCell,
  TableRow,
  UnknownBlock,
};
