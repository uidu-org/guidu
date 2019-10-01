import { DateDefinition } from '@uidu/adf-schema';

export const date = (
  attrs: DateDefinition['attrs'] = { timestamp: '' },
): DateDefinition => ({
  type: 'date',
  attrs,
});
