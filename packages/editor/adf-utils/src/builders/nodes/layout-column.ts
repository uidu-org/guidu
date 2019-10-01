import { BlockContent, LayoutColumnDefinition } from '@uidu/adf-schema';

export const layoutColumn = (attrs: { width: number }) => (
  content: BlockContent[],
): LayoutColumnDefinition => ({
  type: 'layoutColumn',
  attrs,
  content,
});
