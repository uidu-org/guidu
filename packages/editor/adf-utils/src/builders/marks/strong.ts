import { StrongDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const strong = (maybeNode: WithMark | string) =>
  applyMark<StrongDefinition>({ type: 'strong' }, maybeNode);
