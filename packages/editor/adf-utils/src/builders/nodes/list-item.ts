import { ListItemArray, ListItemDefinition } from '@uidu/adf-schema';

export const listItem = (content: ListItemArray): ListItemDefinition => ({
  type: 'listItem',
  content,
});
