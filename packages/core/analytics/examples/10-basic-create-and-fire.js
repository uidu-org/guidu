// @flow
import React, { Component } from 'react';
import {
  AnalyticsListener,
  UIAnalyticsEvent,
  withAnalyticsEvents,
} from '../src';

class ButtonBase extends Component<*> {
  handleClick = e => {
    // Create our analytics event
    const analyticsEvent = this.props.createAnalyticsEvent({ action: 'click' });

    // Fire our analytics event on the 'uidu' channel
    analyticsEvent.fire('uidu');

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const { createAnalyticsEvent, ...props } = this.props;
    return <button {...props} onClick={this.handleClick} />;
  }
}

const Button = withAnalyticsEvents()(ButtonBase);

// eslint-disable-next-line react/no-multi-comp
export default class App extends Component<void> {
  handleEvent = (analyticsEvent: UIAnalyticsEvent) => {
    const { payload, context } = analyticsEvent;
    console.log('Received event:', { payload, context });
  };

  render() {
    return (
      <AnalyticsListener channel="uidu" onEvent={this.handleEvent}>
        <Button>Click me</Button>
      </AnalyticsListener>
    );
  }
}
