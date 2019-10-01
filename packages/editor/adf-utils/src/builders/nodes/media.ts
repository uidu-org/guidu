import { MediaDefinition, MediaAttributes } from '@uidu/adf-schema';

export const media = (attrs: MediaAttributes): MediaDefinition => ({
  type: 'media',
  attrs,
});
