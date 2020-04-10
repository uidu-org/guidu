import { MentionAttributes, MentionDefinition } from '@uidu/adf-schema';

export const mention = (attrs: MentionAttributes): MentionDefinition => ({
  type: 'mention',
  attrs: { accessLevel: '', ...attrs },
});
