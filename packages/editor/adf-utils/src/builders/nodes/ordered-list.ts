import {
  ListItemDefinition,
  OrderedListDefinition,
} from '@uidu/adf-schema';

export const orderedList = (attrs?: OrderedListDefinition['attrs']) => (
  ...content: Array<ListItemDefinition>
): OrderedListDefinition => ({
  type: 'orderedList',
  attrs,
  content,
});
