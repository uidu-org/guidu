import { StatusDefinition } from '@uidu/adf-schema';

export const status = (
  attrs: StatusDefinition['attrs'] = {
    text: 'In progress',
    color: 'blue',
  },
): StatusDefinition => ({
  type: 'status',
  attrs,
});
