import { HardBreakDefinition } from '@uidu/adf-schema';

export const hardBreak = (
  attrs?: HardBreakDefinition['attrs'],
): HardBreakDefinition => ({
  type: 'hardBreak',
  attrs,
});
