import {
  AnnotationMarkDefinition as Annotation,
  CodeDefinition as Code,
  EmDefinition as Em,
  LinkDefinition as Link,
  StrikeDefinition as Strike,
  StrongDefinition as Strong,
  SubSupDefinition as SubSup,
  TextColorDefinition as TextColor,
  UnderlineDefinition as Underline,
} from '../../marks';
import { DateDefinition as Date } from '../date';
import { EmojiDefinition as Emoji } from '../emoji';
import { HardBreakDefinition as HardBreak } from '../hard-break';
import { InlineCardDefinition as InlineCard } from '../inline-card';
import { InlineExtensionDefinition as InlineExtension } from '../inline-extension';
import { MentionDefinition as Mention } from '../mention';
import { PlaceholderDefinition as Placeholder } from '../placeholder';
import { TextDefinition as Text } from '../text';
import { MarksObject } from './mark';

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
  | InlineCard;
/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;
