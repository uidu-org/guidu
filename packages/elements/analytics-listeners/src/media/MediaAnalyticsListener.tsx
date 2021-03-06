import {
  AnalyticsListener,
  UIAnalyticsEvent,
  UIAnalyticsEventHandler,
} from '@uidu/analytics';
import { DEFAULT_SOURCE, GasPayload } from '@uidu/analytics-gas-types';
import * as React from 'react';
import { sendEvent } from '../analytics-web-client-wrapper';
import { getPackageHierarchy } from '../guidu/extract-data-from-event';
import { FabricChannel, ListenerProps } from '../types';
import { mergeEventData } from './mergeData';

// This function will attach a packageHierarchy value inside of 'attributes' attribute payload.
// It won't attach it if getPackageHierarchy returns undefined (that's in the case when no context data provided a package name/version)
function attachPackageHierarchy(
  event: UIAnalyticsEvent,
  attributes: { [key: string]: any },
) {
  const packageHierarchy = getPackageHierarchy(event);
  return !attributes && !packageHierarchy
    ? {}
    : {
        attributes: {
          ...attributes,
          ...(packageHierarchy ? { packageHierarchy } : {}),
        },
      };
}

export default class MediaAnalyticsListener extends React.Component<
  ListenerProps
> {
  listenerHandler: UIAnalyticsEventHandler = (event) => {
    const { client, logger } = this.props;
    logger.debug('Received Media event', event);
    const mergedPayloadWithContext = mergeEventData(event);
    if (mergedPayloadWithContext) {
      const payloadAttributes = attachPackageHierarchy(
        event,
        mergedPayloadWithContext.attributes,
      );
      const payload = {
        source: DEFAULT_SOURCE,
        ...mergedPayloadWithContext,
        ...payloadAttributes,
        tags: mergedPayloadWithContext.tags
          ? Array.from(new Set([...mergedPayloadWithContext.tags, 'media']))
          : ['media'],
      } as GasPayload;
      sendEvent(logger, client)(payload);
    }
  };

  render() {
    return (
      <AnalyticsListener
        onEvent={this.listenerHandler}
        channel={FabricChannel.media}
      >
        {this.props.children}
      </AnalyticsListener>
    );
  }
}
