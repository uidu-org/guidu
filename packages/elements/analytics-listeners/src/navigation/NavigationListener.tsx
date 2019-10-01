import * as React from 'react';
import {
  AnalyticsListener,
  UIAnalyticsEventHandler,
} from '@uidu/analytics';

import { sendEvent } from '../analytics-web-client-wrapper';
import { ListenerProps, FabricChannel } from '../types';

import processEvent from './process-event';

export default class NavigationListener extends React.Component<ListenerProps> {
  listenerHandler: UIAnalyticsEventHandler = event => {
    const { client, logger } = this.props;
    logger.debug('Received Navigation event', event);
    const payload = processEvent(event, logger);
    logger.debug('Processed Navigation event', payload);

    if (payload) {
      sendEvent(logger, client)(payload);
    }
  };

  render() {
    return (
      <AnalyticsListener
        onEvent={this.listenerHandler}
        channel={FabricChannel.navigation}
      >
        {this.props.children}
      </AnalyticsListener>
    );
  }
}
