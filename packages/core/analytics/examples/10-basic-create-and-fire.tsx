import React, { Component, MouseEvent } from 'react';
import {
  AnalyticsListener,
  UIAnalyticsEvent,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '../src';

interface Props extends WithAnalyticsEventsProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

class ButtonBase extends Component<Props> {
  handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Create our analytics event
    const analyticsEvent = this.props.createAnalyticsEvent!({
      action: 'click',
    });

    // Fire our analytics event on the 'atlaskit' channel
    analyticsEvent.fire('atlaskit');

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

export default class App extends Component<void> {
  handleEvent = (analyticsEvent: UIAnalyticsEvent) => {
    const { payload, context } = analyticsEvent;
    console.log('Received event:', { payload, context });
  };

  render() {
    return (
      <AnalyticsListener channel="atlaskit" onEvent={this.handleEvent}>
        <Button onClick={() => console.log('onClick callback')}>
          Click me
        </Button>
      </AnalyticsListener>
    );
  }
}
