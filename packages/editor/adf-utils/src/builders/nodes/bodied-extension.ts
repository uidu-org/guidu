import { BodiedExtensionDefinition, ExtensionContent } from '@uidu/adf-schema';

export const bodiedExtension = (attrs: BodiedExtensionDefinition['attrs']) => (
  ...content: ExtensionContent
): BodiedExtensionDefinition => ({
  type: 'bodiedExtension',
  attrs,
  content,
});
