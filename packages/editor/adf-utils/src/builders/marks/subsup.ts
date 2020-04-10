import { SubSupAttributes, SubSupDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const subsup = (attrs: SubSupAttributes) => (
  maybeNode: WithMark | string,
) => applyMark<SubSupDefinition>({ type: 'subsup', attrs }, maybeNode);
