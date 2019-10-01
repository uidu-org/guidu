import {
  DecisionListDefinition,
  DecisionItemDefinition,
} from '@uidu/adf-schema';

export const decisionList = (attrs: DecisionListDefinition['attrs']) => (
  ...content: Array<DecisionItemDefinition>
): DecisionListDefinition => ({
  type: 'decisionList',
  attrs,
  content,
});
