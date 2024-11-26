import {
  ADFEntity,
  ErrorCallbackOptions,
  ValidationError,
  validator,
} from '@uidu/adf-utils';
import { Schema } from 'prosemirror-model';

export const UNSUPPORTED_NODE_ATTRIBUTE = 'unsupportedNodeAttribute';

const errorCallbackFor = (marks: any) => {
  return (
    entity: ADFEntity,
    error: ValidationError,
    options: ErrorCallbackOptions,
  ) => {
    return validationErrorHandler(entity, error, options, marks);
  };
};

export const validationErrorHandler = (
  entity: ADFEntity,
  error: ValidationError,
  options: ErrorCallbackOptions,
  marks: string[],
) => {
  if (entity && entity.type === UNSUPPORTED_NODE_ATTRIBUTE) {
    return entity;
  }

  if (options.isMark) {
    return wrapWithUnsupported(error.meta as ADFEntity, 'mark');
  }

  if (options.isNodeAttribute) {
    const entityType = entity && entity.type ? entity.type : undefined;
    return {
      type: UNSUPPORTED_NODE_ATTRIBUTE,
      attrs: {
        type: { nodeType: entityType },
        unsupported: error.meta,
      },
    };
  }

  if (entity && marks.indexOf(entity.type) > -1) {
    return;
  }

  /**
   * There's a inconsistency between ProseMirror and ADF.
   * `content` is actually optional in ProseMirror.
   * And, also empty `text` node is not valid.
   */
  if (error.code === 'MISSING_PROPERTIES' && entity.type === 'paragraph') {
    return { type: 'paragraph', content: [] };
  }

  // Can't fix it by wrapping
  // TODO: We can repair missing content like `panel` without a `paragraph`.
  if (error.code === 'INVALID_CONTENT_LENGTH') {
    return entity;
  }
  if (options.allowUnsupportedBlock) {
    return wrapWithUnsupported(entity);
  }

  if (options.allowUnsupportedInline) {
    return wrapWithUnsupported(entity, 'inline');
  }

  return entity;
};

export const validateADFEntity = (
  schema: Schema,
  node: ADFEntity,
): ADFEntity => {
  const nodes = Object.keys(schema.nodes);
  const marks = Object.keys(schema.marks);
  const validate = validator(nodes, marks, { allowPrivateAttributes: true });
  const emptyDoc: ADFEntity = { type: 'doc', content: [] };

  const { entity = emptyDoc } = validate(node, errorCallbackFor(marks));

  return entity;
};

export function wrapWithUnsupported(
  originalValue: ADFEntity,
  type: 'block' | 'inline' | 'mark' = 'block',
) {
  let unsupportedNodeType: string;
  switch (type) {
    case 'inline':
      unsupportedNodeType = 'unsupportedInline';
      break;

    case 'mark':
      unsupportedNodeType = 'unsupportedMark';
      break;

    default:
      unsupportedNodeType = 'unsupportedBlock';
  }

  return {
    type: unsupportedNodeType,
    attrs: { originalValue },
  };
}
