// @flow

import React, { Component } from 'react';
import {
  AnalyticsContext,
  AnalyticsListener,
  withAnalyticsEvents,
  type UIAnalyticsEvent,
} from '../src';

const Button = withAnalyticsEvents({ onClick: { action: 'click ' } })(
  ({ createAnalyticsEvent, ...props }) => <button {...props} />,
);

const onEvent = ({ context, payload }: UIAnalyticsEvent) => {
  console.log('Received event:', { context, payload });
};

type Props = {
  onClick: (Event, UIAnalyticsEvent) => void,
};

class Everything extends Component<Props> {
  componentWillUnmount() {
    console.log('Unmounting everything...');
  }

  render() {
    return (
      <AnalyticsListener channel="jira" onEvent={onEvent}>
        <AnalyticsContext data={{ foo: 'bar' }}>
          <AnalyticsContext data={{ abc: 123 }}>
            <Button onClick={this.props.onClick}>Click me</Button>
          </AnalyticsContext>
        </AnalyticsContext>
      </AnalyticsListener>
    );
  }
}

const Nothing = () => <div>Everything has unmounted!</div>;

const mockReduxEpicDispatch = (analyticsEvent: UIAnalyticsEvent) => {
  setTimeout(() => {
    const newIdFromTheServer = Math.round(Math.random() * 1000);
    analyticsEvent.update({ newIdFromTheServer }).fire('jira');
  }, 1000);
};

type State = { hasUnmountedEverything: boolean };
// eslint-disable-next-line react/no-multi-comp
export default class App extends Component<void, State> {
  state = {
    hasUnmountedEverything: false,
  };

  handleClick = (e: Event, analyticsEvent: UIAnalyticsEvent) => {
    this.setState({ hasUnmountedEverything: true });

    mockReduxEpicDispatch(analyticsEvent);
  };

  render() {
    return (
      <div>
        {this.state.hasUnmountedEverything ? (
          <Nothing />
        ) : (
          <Everything onClick={this.handleClick} />
        )}
      </div>
    );
  }
}
