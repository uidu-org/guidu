import {
  CreateUIAnalyticsEvent,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
import * as React from 'react';

export type Props = {
  render: (createAnalyticsEvent?: CreateUIAnalyticsEvent) => React.ReactNode;
};

export const WithCreateAnalyticsEvent: React.ComponentType<
  Props
> = withAnalyticsEvents()(
  class WithCreateAnalyticsEvent extends React.Component<
    Props & WithAnalyticsEventsProps
  > {
    render() {
      const { render, createAnalyticsEvent } = this.props;
      return render(createAnalyticsEvent);
    }
  },
);
