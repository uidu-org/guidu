import { withAnalyticsEvents } from '@uidu/analytics';
import * as React from 'react';

export type Props = {
  render: (createAnalyticsEvent?: any) => React.ReactNode;
};

export const WithCreateAnalyticsEvent = withAnalyticsEvents()(
  class WithCreateAnalyticsEvent extends React.Component<any> {
    render() {
      const { render, createAnalyticsEvent } = this.props;
      return render(createAnalyticsEvent);
    }
  },
);
