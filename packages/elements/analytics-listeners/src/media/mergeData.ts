import {
  UIAnalyticsEvent,
  AnalyticsEventPayload,
} from '@uidu/analytics';

// TagsA will be added first in the tags array
const joinPayloadTags = (tagsA?: string[], tagsB?: string[]) =>
  tagsA || tagsB ? { tags: [...(tagsA || []), ...(tagsB || [])] } : {};

// Object A overrides Object B
const mergePayloadAttributes = (
  attributesA?: AnalyticsEventPayload['attributes'],
  attributesB?: AnalyticsEventPayload['attributes'],
) =>
  attributesA || attributesB
    ? {
        attributes: {
          ...(attributesB || {}),
          ...(attributesA || {}),
        },
      }
    : {};

// Object A overrides Object B
// Tags from Object A will be added first in the tags array
function mergePayloadObjects(
  payloadA: AnalyticsEventPayload,
  payloadB: AnalyticsEventPayload,
) {
  return {
    ...payloadB,
    ...payloadA,
    ...mergePayloadAttributes(payloadA.attributes, payloadB.attributes),
    ...joinPayloadTags(payloadA.tags, payloadB.tags),
  };
}

function mergeContext(
  payload: AnalyticsEventPayload,
  context: AnalyticsEventPayload[],
): AnalyticsEventPayload {
  return context.reduce(
    (
      merged: AnalyticsEventPayload,
      contextData: AnalyticsEventPayload,
    ): AnalyticsEventPayload => {
      if (haveSamePackageName(payload, contextData)) {
        return mergePayloadObjects(contextData, merged);
      } else {
        return merged;
      }
    },
    {},
  );
}

function haveSamePackageName(
  payloadA: AnalyticsEventPayload,
  payloadB: AnalyticsEventPayload,
): boolean {
  const packageNameA = payloadA.attributes && payloadA.attributes.packageName;
  const packageNameB = payloadB.attributes && payloadB.attributes.packageName;
  return packageNameA && packageNameB && packageNameA === packageNameB;
}

// This function merges payload with all the context data that match on attributes.packageName
// All the merged data is meant to be included on the final GAS payload.
// Attributes override each other considering payload as top priority and then each context data
// from the deepest level of the component tree (highest priority) to the top most level (lowest priority).
export function mergeEventData({
  payload,
  context,
}: UIAnalyticsEvent): AnalyticsEventPayload | void {
  if (!payload) {
    return;
  }
  const mergedContext = mergeContext(payload, context);
  return mergePayloadObjects(payload, mergedContext);
}
