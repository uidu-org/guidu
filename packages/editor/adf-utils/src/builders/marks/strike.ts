import { StrikeDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const strike = (maybeNode: WithMark | string) =>
  applyMark<StrikeDefinition>({ type: 'strike' }, maybeNode);
