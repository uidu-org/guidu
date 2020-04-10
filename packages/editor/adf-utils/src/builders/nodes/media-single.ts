import {
  MediaDefinition,
  MediaSingleAttributes,
  MediaSingleDefinition,
} from '@uidu/adf-schema';

export const mediaSingle = (attrs: MediaSingleAttributes | undefined) => (
  content: MediaDefinition,
): MediaSingleDefinition => ({
  type: 'mediaSingle',
  attrs,
  content: [content],
});
