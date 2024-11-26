import React from 'react';
import PortalProviderAPI from './PortalProviderApi';

export type PortalProviderProps = {
  render: (
    portalProviderAPI: PortalProviderAPI,
  ) => React.ReactChild | JSX.Element | null;
};

export type Portals = Map<HTMLElement, React.ReactChild>;

export type PortalRendererState = {
  portals: Portals;
};

export type MountedPortal = {
  children: () => React.ReactChild | null;
  hasReactContext: boolean;
};
