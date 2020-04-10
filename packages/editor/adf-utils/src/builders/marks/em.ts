import { EmDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const em = (maybeNode: WithMark | string) => {
  return applyMark<EmDefinition>({ type: 'em' }, maybeNode);
};
