import { LinkAttributes, LinkDefinition } from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const link = (attrs: LinkAttributes) => (maybeNode: WithMark | string) =>
  applyMark<LinkDefinition>({ type: 'link', attrs }, maybeNode);
