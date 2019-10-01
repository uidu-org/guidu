import { NodeSpec } from 'prosemirror-model';

// Nodes
import { PanelDefinition as Panel } from './panel';
import {
  ParagraphDefinition as Paragraph,
  ParagraphWithMarksDefinition as ParagraphWithMarks,
} from './paragraph';
import { BlockQuoteDefinition as Blockquote } from './blockquote';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { BulletListDefinition as BulletList } from './bullet-list';
import { RuleDefinition as Rule } from './rule';
import {
  HeadingDefinition as Heading,
  HeadingWithMarksDefinition as HeadingWithMarks,
} from './heading';
import {
  CodeBlockDefinition as CodeBlock,
  CodeBlockWithMarksDefinition as CodeBlockWithMarks,
} from './code-block';
import { MediaGroupDefinition as MediaGroup } from './media-group';
import { MediaSingleDefinition as MediaSingle } from './media-single';
import { DecisionListDefinition as DecisionList } from './decision-list';
import { TaskListDefinition as TaskList } from './task-list';
import { TableDefinition as Table } from './tableNodes';
import { ExtensionDefinition as Extension } from './extension';
import { InlineExtensionDefinition as InlineExtension } from './inline-extension';
import { BodiedExtensionDefinition as BodiedExtension } from './bodied-extension';

import { TextDefinition as Text } from './text';
import { HardBreakDefinition as HardBreak } from './hard-break';
import { MentionDefinition as Mention } from './mention';
import { EmojiDefinition as Emoji } from './emoji';
import { DateDefinition as Date } from './date';
import { StatusDefinition as Status } from './status';
import { PlaceholderDefinition as Placeholder } from './placeholder';
import { InlineCardDefinition as InlineCard } from './inline-card';
import { BlockCardDefinition as BlockCard } from './block-card';
import { LayoutSectionDefinition as LayoutSection } from './layout-section';

// Marks
import { LinkDefinition as Link } from '../marks/link';
import { EmDefinition as Em } from '../marks/em';
import { StrongDefinition as Strong } from '../marks/strong';
import { StrikeDefinition as Strike } from '../marks/strike';
import { CodeDefinition as Code } from '../marks/code';
import { SubSupDefinition as SubSup } from '../marks/subsup';
import { UnderlineDefinition as Underline } from '../marks/underline';
import { TextColorDefinition as TextColor } from '../marks/text-color';
import { AnnotationMarkDefinition as Annotation } from '../marks/annotation';

// NOTE: BlockContent is only being used by layoutColumn now.
/**
 * @name block_content
 */
export type BlockContent =
  | Panel
  | Paragraph
  | ParagraphWithMarks
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | HeadingWithMarks
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | Table
  | Extension
  | BodiedExtension
  | BlockCard;

/**
 * @name table_cell_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type TableCellContent = Array<
  | Panel
  | Paragraph
  | ParagraphWithMarks
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | HeadingWithMarks
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | Extension
  | BlockCard
>;

// exclude Extension and BodiedExtension
/**
 * @name extension_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type ExtensionContent = Array<
  | Panel
  | Paragraph
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | Table
  | Extension
  | BlockCard
>;

/**
 * @additionalProperties true
 */
export interface MarksObject<T> {
  marks?: Array<T>;
}

/**
 * @additionalProperties true
 */
export interface NoMark {
  /**
   * @maxItems 0
   */
  marks?: Array<any>;
}

/**
 * @name formatted_text_inline_node
 */
export type InlineFormattedText = Text &
  MarksObject<
    Link | Em | Strong | Strike | SubSup | Underline | TextColor | Annotation
  >;

/**
 * @name link_text_inline_node
 */
export type InlineLinkText = Text & MarksObject<Link>;

/**
 * @name code_inline_node
 */
export type InlineCode = Text & MarksObject<Code | Link | Annotation>;

/**
 * @name atomic_inline_node
 */
export type InlineAtomic =
  | HardBreak
  | Mention
  | Emoji
  | InlineExtension
  | Date
  | Placeholder
  | InlineCard
  | Status;

/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;

/**
 * @name doc_node
 */
export interface DocNode {
  version: 1;
  type: 'doc';
  /**
   * @allowUnsupportedBlock true
   */
  content: Array<BlockContent | LayoutSection | CodeBlockWithMarks>;
}

export const doc: NodeSpec = {
  content: '(block|layoutSection)+',
  marks: 'alignment breakout indentation link',
};
