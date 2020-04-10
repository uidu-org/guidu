import { CodeDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const code = (maybeNode: WithMark | string) =>
  applyMark<CodeDefinition>({ type: 'code' }, maybeNode);
