import {
  AnnotationMarkAttributes,
  AnnotationMarkDefinition,
} from '@uidu/adf-schema';
import { WithMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const annotation = (attrs: AnnotationMarkAttributes) => (
  maybeNode: WithMark | string,
) =>
  applyMark<AnnotationMarkDefinition>({ type: 'annotation', attrs }, maybeNode);
