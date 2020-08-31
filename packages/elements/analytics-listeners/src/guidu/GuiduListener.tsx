import { AnalyticsListener, UIAnalyticsEventHandler } from '@uidu/analytics';
import * as React from 'react';
import { sendEvent } from '../analytics-web-client-wrapper';
import { FabricChannel, ListenerProps } from '../types';
import processEvent from './process-event';

export default class GuiduListener extends React.Component<ListenerProps> {
  listenerHandler: UIAnalyticsEventHandler = (event) => {
    const { client, logger } = this.props;
    logger.debug('Received Guidu event', event);
    const payload = processEvent(event, logger);
    logger.debug('Processed Guidu event', payload);

    if (payload) {
      sendEvent(logger, client)(payload);
    }
  };

  render() {
    return (
      <AnalyticsListener
        onEvent={this.listenerHandler}
        channel={FabricChannel.uidu}
      >
        {this.props.children}
      </AnalyticsListener>
    );
  }
}
