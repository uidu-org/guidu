import React from 'react';
import { FireAnalyticsCallback } from '../../plugins/analytics/fire-analytics-event';
import PortalProviderAPI from './PortalProviderApi';

export type PortalProviderProps = {
  render: (
    portalProviderAPI: PortalProviderAPI,
  ) => React.ReactChild | JSX.Element | null;
  onAnalyticsEvent?: FireAnalyticsCallback;
};

export type Portals = Map<HTMLElement, React.ReactChild>;

export type PortalRendererState = {
  portals: Portals;
};

export type MountedPortal = {
  children: () => React.ReactChild | null;
  hasReactContext: boolean;
};
