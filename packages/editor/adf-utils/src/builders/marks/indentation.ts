import {
  IndentationMarkAttributes,
  IndentationMarkDefinition,
  ParagraphDefinition,
} from '@uidu/adf-schema';
import { WithAppliedMark, WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const indentation = (attrs: IndentationMarkAttributes) => (
  maybeNode: WithMark | string,
) =>
  applyMark<IndentationMarkDefinition>(
    { type: 'indentation', attrs },
    maybeNode,
  ) as WithAppliedMark<ParagraphDefinition, IndentationMarkDefinition>;
