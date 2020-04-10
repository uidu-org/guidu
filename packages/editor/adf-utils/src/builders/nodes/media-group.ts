import { MediaDefinition, MediaGroupDefinition } from '@uidu/adf-schema';

export const mediaGroup = (
  ...content: Array<MediaDefinition>
): MediaGroupDefinition => ({
  type: 'mediaGroup',
  content,
});
