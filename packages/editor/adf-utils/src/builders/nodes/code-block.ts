import {
  CodeBlockDefinition,
  TextDefinition,
  NoMark,
} from '@uidu/adf-schema';

export type CodeBlockContent = TextDefinition & NoMark;

export const codeBlock = (attrs: CodeBlockDefinition['attrs'] | undefined) => (
  ...content: Array<CodeBlockContent>
): CodeBlockDefinition => ({
  type: 'codeBlock',
  attrs,
  content,
});
