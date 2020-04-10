import { UnderlineDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const underline = (maybeNode: WithMark | string) =>
  applyMark<UnderlineDefinition>({ type: 'underline' }, maybeNode);
