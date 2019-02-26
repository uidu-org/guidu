// @flow

import { Component } from 'react';
import {
  withAnalyticsEvents,
  type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import { NAVIGATION_CHANNEL } from '../../constants';

type Props = {
  ...WithAnalyticsEventsProps,
  /** The name of the screen that is being displayed, sent in analytics. */
  name: string,
  /** Whether the screen is visible or not */
  isVisible: boolean,
};

/** Fires a screen event when the screen becomes visible */
export class ScreenTrackerBase extends Component<Props> {
  componentDidMount() {
    if (this.props.isVisible) {
      this.fireScreenEvent();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.fireScreenEvent();
    }
  }

  fireScreenEvent = () => {
    const { name, createAnalyticsEvent } = this.props;
    createAnalyticsEvent({
      eventType: 'screen',
      name,
    }).fire(NAVIGATION_CHANNEL);
  };

  render() {
    return null;
  }
}

export default withAnalyticsEvents()(ScreenTrackerBase);
