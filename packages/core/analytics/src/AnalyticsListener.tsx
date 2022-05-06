import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AnalyticsReactContext } from './AnalyticsReactContext';
import UIAnalyticsEvent, { UIAnalyticsEventHandler } from './UIAnalyticsEvent';

type Props = {
  /** Children! */
  children?: React.ReactNode;
  /** The channel to listen for events on. */
  channel?: string;
  /** A function which will be called when an event is fired on this Listener's
   * channel. It is passed the event and the channel as arguments. */
  onEvent: (event: UIAnalyticsEvent, channel?: string) => void;
};

const ContextTypes = {
  getAnalyticsEventHandlers: PropTypes.func,
};

class AnalyticsListener extends Component<Props> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  getChildContext = () => ({
    getAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
  });

  getAnalyticsEventHandlers = () => {
    const { channel, onEvent } = this.props;
    const { getAnalyticsEventHandlers } = this.context;
    const parentEventHandlers =
      (typeof getAnalyticsEventHandlers === 'function' &&
        getAnalyticsEventHandlers()) ||
      [];
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };

    return [handler, ...parentEventHandlers];
  };

  render() {
    const { getAnalyticsContext = () => [] } = this.context;
    const { children } = this.props;
    return (
      <AnalyticsReactContext.Provider
        value={{
          getAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
          getAnalyticsContext,
        }}
      >
        {children}
      </AnalyticsReactContext.Provider>
    );
  }
}

export default AnalyticsListener;
