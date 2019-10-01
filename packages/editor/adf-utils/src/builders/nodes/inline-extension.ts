import { InlineExtensionDefinition } from '@uidu/adf-schema';

export const inlineExtension = (
  attrs: InlineExtensionDefinition['attrs'],
) => (): InlineExtensionDefinition => ({
  type: 'inlineExtension',
  attrs,
});
