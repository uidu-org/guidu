import { PlaceholderDefinition } from '@uidu/adf-schema';

export const placeholder = (
  attrs: PlaceholderDefinition['attrs'],
): PlaceholderDefinition => ({
  type: 'placeholder',
  attrs,
});
