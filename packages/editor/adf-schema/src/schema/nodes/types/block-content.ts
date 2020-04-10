// NOTE: BlockContent is only being used by layoutColumn now.
import { BlockCardDefinition as BlockCard } from '../block-card';
import { BlockQuoteDefinition as Blockquote } from '../blockquote';
import { BodiedExtensionDefinition as BodiedExtension } from '../bodied-extension';
import { BulletListDefinition as BulletList } from '../bullet-list';
import { CodeBlockDefinition as CodeBlock } from '../code-block';
import { DecisionListDefinition as DecisionList } from '../decision-list';
import { ExpandDefinition as Expand } from '../expand';
import { ExtensionDefinition as Extension } from '../extension';
import {
  HeadingDefinition as Heading,
  HeadingWithMarksDefinition as HeadingWithMarks,
} from '../heading';
import { MediaGroupDefinition as MediaGroup } from '../media-group';
import { MediaSingleDefinition as MediaSingle } from '../media-single';
import { OrderedListDefinition as OrderedList } from '../ordered-list';
import { PanelDefinition as Panel } from '../panel';
import {
  ParagraphDefinition as Paragraph,
  ParagraphWithAlignmentDefinition as ParagraphWithMarks,
} from '../paragraph';
import { RuleDefinition as Rule } from '../rule';
import { TableDefinition as Table } from '../tableNodes';
import { TaskListDefinition as TaskList } from '../task-list';

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
  | Expand
  | Extension
  | BodiedExtension
  | BlockCard;
