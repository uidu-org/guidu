import {
  BreakoutMarkAttrs,
  BreakoutMarkDefinition,
  CodeBlockDefinition,
  LayoutSectionDefinition,
} from '@uidu/adf-schema';
import { WithAppliedMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const breakout = (attrs: BreakoutMarkAttrs) => (
  maybeNode: CodeBlockDefinition | LayoutSectionDefinition,
) => {
  return applyMark<BreakoutMarkDefinition>(
    { type: 'breakout', attrs },
    maybeNode,
  ) as WithAppliedMark<typeof maybeNode, BreakoutMarkDefinition>;
};
