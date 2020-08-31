import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  getGuiduAnalyticsEventHandlers: PropTypes.func,
};

class AnalyticsListener extends Component<Props> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  getChildContext = () => ({
    getGuidulyticsEventHandlers: this.getAnalyticsEventHandlers,
  });

  getAnalyticsEventHandlers = () => {
    const { channel, onEvent } = this.props;
    const { getGuidulyticsEventHandlers } = this.context;
    const parentEventHandlers =
      (typeof getGuidulyticsEventHandlers === 'function' &&
        getGuidulyticsEventHandlers()) ||
      [];
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };

    return [handler, ...parentEventHandlers];
  };

  render() {
    const { getGuiduAnalyticsContext = () => [] } = this.context;
    const { children } = this.props;
    return (
      <AnalyticsReactContext.Provider
        value={{
          getGuidulyticsEventHandlers: this.getAnalyticsEventHandlers,
          getGuiduAnalyticsContext,
        }}
      >
        {children}
      </AnalyticsReactContext.Provider>
    );
  }
}

export default AnalyticsListener;
