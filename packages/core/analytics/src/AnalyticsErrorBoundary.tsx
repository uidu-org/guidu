import React, { Component, ReactNode } from 'react';
import AnalyticsContext from './AnalyticsContext';
import withAnalyticsEvents, {
  WithAnalyticsEventsProps,
} from './withAnalyticsEvents';

type AnalyticsErrorBoundaryErrorInfo = {
  componentStack: string;
};

export interface AnalyticsErrorBoundaryProps extends WithAnalyticsEventsProps {
  /** React component to be wrapped */
  children: ReactNode;
  channel: string;
  data: {};
}

type AnalyticsErrorBoundaryPayload = {
  error: Error | string;
  info?: AnalyticsErrorBoundaryErrorInfo;
  [key: string]: any;
};

const isObject = (o: any) =>
  typeof o === 'object' && o !== null && !Array.isArray(o);

export class BaseAnalyticsErrorBoundary extends Component<
  AnalyticsErrorBoundaryProps,
  {}
> {
  fireAnalytics = (analyticsErrorPayload: AnalyticsErrorBoundaryPayload) => {
    const { createAnalyticsEvent, channel, data } = this.props;

    createAnalyticsEvent!({
      action: 'UnhandledError',
      eventType: 'ui',
      attributes: {
        browserInfo:
          window && window.navigator && window.navigator.userAgent
            ? window.navigator.userAgent
            : 'unknown',
        ...data,
        ...(isObject(analyticsErrorPayload) ? analyticsErrorPayload : {}),
      },
    }).fire(channel);
  };

  componentDidCatch(
    error: Error,
    info?: AnalyticsErrorBoundaryErrorInfo,
  ): void {
    const payload: AnalyticsErrorBoundaryPayload = {
      error,
      info,
    };

    this.fireAnalytics(payload);
  }

  render() {
    const { data, children } = this.props;
    return <AnalyticsContext data={data}>{children}</AnalyticsContext>;
  }
}

const AnalyticsErrorBoundary = withAnalyticsEvents()(
  BaseAnalyticsErrorBoundary,
);

export default AnalyticsErrorBoundary;
