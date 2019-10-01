import { EmDefinition } from '@uidu/adf-schema';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const em = (maybeNode: WithMark | string) => {
  return applyMark<EmDefinition>({ type: 'em' }, maybeNode);
};
