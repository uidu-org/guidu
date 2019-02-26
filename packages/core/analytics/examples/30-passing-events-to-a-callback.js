// @flow
import React, { Component } from 'react';
import {
  AnalyticsListener,
  UIAnalyticsEvent,
  withAnalyticsEvents,
} from '../src';

class ManualButtonBase extends Component<*> {
  handleClick = e => {
    // Create our analytics event
    const analyticsEvent = this.props.createAnalyticsEvent({ action: 'click' });

    if (this.props.onClick) {
      // Pass the event through the corresponding callback prop
      this.props.onClick(e, analyticsEvent);
    }
  };

  render() {
    const { createAnalyticsEvent, ...props } = this.props;
    return <button {...props} onClick={this.handleClick} />;
  }
}

// eslint-disable-next-line react/no-multi-comp
class ButtonBase extends Component<*> {
  render() {
    const { createAnalyticsEvent, ...props } = this.props;
    return <button {...props} />;
  }
}

const ManualButton = withAnalyticsEvents()(ManualButtonBase);
const VerboseButton = withAnalyticsEvents({
  onClick: create => create({ action: 'click' }),
})(ButtonBase);
const ShorthandButton = withAnalyticsEvents({ onClick: { action: 'click' } })(
  ButtonBase,
);

const ButtonGroup = () => {
  const onClick = (e, analyticsEvent) => analyticsEvent.fire('uidu');
  return (
    <div>
      <div>
        <ManualButton onClick={onClick}>
          Manually creating and passing up the event
        </ManualButton>
      </div>
      <div>
        <VerboseButton onClick={onClick}>
          {`Using a function in the 'create event map' option`}
        </VerboseButton>
      </div>
      <div>
        <ShorthandButton onClick={onClick}>
          {`Using the payload object shorthand in the 'create event map' option`}
        </ShorthandButton>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/no-multi-comp
export default class App extends Component<void> {
  handleEvent = (analyticsEvent: UIAnalyticsEvent) => {
    const { payload, context } = analyticsEvent;
    console.log('Received event:', { payload, context });
  };

  render() {
    return (
      <AnalyticsListener channel="uidu" onEvent={this.handleEvent}>
        <ButtonGroup />
      </AnalyticsListener>
    );
  }
}
