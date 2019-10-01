import { BulletListDefinition, ListItemDefinition } from '@uidu/adf-schema';

export const bulletList = (
  ...content: Array<ListItemDefinition>
): BulletListDefinition => ({
  type: 'bulletList',
  content,
});
