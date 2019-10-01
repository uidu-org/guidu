import { TextDefinition } from '@uidu/adf-schema';

export const text = (text: string): TextDefinition => ({
  type: 'text',
  text,
});
