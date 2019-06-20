import { Schema, Slice } from 'prosemirror-model';
import { JSONDocNode, JSONNode } from '../';
import { filterContentByType, filterSliceByType } from './filter';

const taskDecisionAllowedNodeTypes = new Set([
  'text',
  'emoji',
  'mention',
  'status',
  'date',
  'hardBreak',
]);

export function taskDecisionDocFilter(
  doc: JSONDocNode,
  schema?: Schema,
): JSONNode[] {
  return filterContentByType(doc, taskDecisionAllowedNodeTypes, schema, true);
}

export function taskDecisionSliceFilter(
  schema: Schema,
): (slice: Slice) => Slice {
  return (slice: Slice) =>
    filterSliceByType(slice, taskDecisionAllowedNodeTypes, schema, true);
}
