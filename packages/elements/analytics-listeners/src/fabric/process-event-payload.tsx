import {
  DEFAULT_SOURCE,
  GasPayload,
  GasScreenEventPayload,
} from '@uidu/analytics-gas-types';
import {
  ELEMENTS_CONTEXT,
  EDITOR_CONTEXT,
} from '@uidu/analytics-namespaced-context';
import { UIAnalyticsEvent } from '@uidu/analytics';
import merge from 'lodash.merge';
import { ELEMENTS_TAG } from './FabricElementsListener';
import { EDITOR_TAG } from './FabricEditorListener';

const extractFieldsFromContext = (fieldsToPick: string[]) => (
  contexts: Record<string, any>[],
) =>
  contexts
    .map(ctx =>
      fieldsToPick.reduce(
        (result, key) =>
          ctx[key] ? merge(result, { [key]: ctx[key] }) : result,
        {},
      ),
    )
    .reduce((result, item) => merge(result, item), {});

const fieldExtractor = (contextKey: string) =>
  extractFieldsFromContext([
    'source',
    'objectType',
    'objectId',
    'containerType',
    'containerId',
    contextKey,
  ]);

const getContextKey = (tag: string): string => {
  switch (tag) {
    case ELEMENTS_TAG:
      return ELEMENTS_CONTEXT;
    case EDITOR_TAG:
      return EDITOR_CONTEXT;
    default:
      return '';
  }
};

const updatePayloadWithContext = (
  tag: string,
  event: UIAnalyticsEvent,
): GasPayload | GasScreenEventPayload => {
  if (event.context.length === 0) {
    return { source: DEFAULT_SOURCE, ...event.payload } as
      | GasPayload
      | GasScreenEventPayload;
  }

  const contextKey = getContextKey(tag) || 'attributes';
  const {
    [contextKey]: attributes,
    ...fields
  }: Record<string, any> = fieldExtractor(contextKey)(event.context);

  if (attributes) {
    event.payload.attributes = merge(
      attributes,
      event.payload.attributes || {},
    );
  }
  return { source: DEFAULT_SOURCE, ...fields, ...event.payload } as
    | GasPayload
    | GasScreenEventPayload;
};

const addTag = (tag: string, originalTags?: string[]): string[] => {
  const tags = new Set(originalTags || []);
  tags.add(tag);
  return Array.from(tags);
};

export const processEventPayload = (
  event: UIAnalyticsEvent,
  tag: string,
): GasPayload | GasScreenEventPayload => {
  return {
    ...updatePayloadWithContext(tag, event),
    tags: addTag(tag, event.payload.tags),
  };
};
