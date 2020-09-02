/**
 * Inspired by analytics-web-react
 */

import { UIAnalyticsEvent } from '@uidu/analytics';
import {
  DEFAULT_SOURCE,
  GasPayload,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@uidu/analytics-gas-types';
import last from 'lodash.last';
import merge from 'lodash.merge';
import Logger from '../helpers/logger';
import pkg from '../version.json';
import {
  getActionSubject,
  getComponents,
  getExtraAttributes,
  getPackageHierarchy,
  getPackageInfo,
  getSources,
} from './extract-data-from-event';

const ATLASKIT_TAG = 'uidu';

/**
 * This util exists to convert the Guidu event format into the analytics platform format.
 *
 * Guidu event format:
 * event {
 *      payload: {
 *          ...attributesFromLowestPointInTheTree
 *      },
 *      context: [{
 *          ...attributesFromHighestPointInTheTree
 *      }, {
 *          ...attributesFromSecondHighestPointInTheTree
 *      }]
 * }
 *
 * Analytics platform event format:
 *  event {
 *      type: @uidu/analytics-gas-types.EventType
 *      payload {
 *          ...mandatoryAttributesBasedOnEventType
 *          attributes: {
 *              ...arbitraryAttributes
 *          }
 *      }
 *  }
 */

export default (event: UIAnalyticsEvent, logger: Logger): GasPayload | null => {
  const sources = getSources(event);
  const source = last(sources) || DEFAULT_SOURCE;
  const extraAttributes = getExtraAttributes(event);
  const components = getComponents(event);

  const { packageName, packageVersion } =
    last(getPackageInfo(event)) || ({} as any);

  const {
    eventType = UI_EVENT_TYPE,
    action,
    actionSubjectId,
    attributes: payloadAttributes,
  } = event.payload;
  const attributes = {
    listenerVersion: pkg.version,
    sourceHierarchy: sources.join('.') || undefined,
    componentHierarchy: components.join('.') || undefined,
    packageHierarchy: getPackageHierarchy(event) || undefined,
    ...{ packageName, packageVersion },
    ...merge(extraAttributes, payloadAttributes),
  };
  // Ensure uidu tag is not duplicated by using Set
  const tags: Set<string> = new Set(event.payload.tags || []);
  tags.add(ATLASKIT_TAG);

  if (event.payload) {
    if (eventType === UI_EVENT_TYPE) {
      return {
        eventType,
        source,
        actionSubject: getActionSubject(event),
        action,
        actionSubjectId,
        attributes,
        tags: Array.from(tags),
      } as any;
    }

    if (
      eventType === TRACK_EVENT_TYPE ||
      eventType === OPERATIONAL_EVENT_TYPE ||
      eventType === SCREEN_EVENT_TYPE
    ) {
      logger.error(
        'Track, screen and operational events are currently not supported for uidu events',
      );
    } else {
      logger.error('Invalid event type', eventType);
    }
  }

  return null;
};
