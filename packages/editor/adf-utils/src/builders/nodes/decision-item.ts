import { DecisionItemDefinition, Inline } from '@uidu/adf-schema';

export const decisionItem = (attrs: DecisionItemDefinition['attrs']) => (
  ...content: Array<Inline>
): DecisionItemDefinition => ({
  type: 'decisionItem',
  attrs,
  content,
});
