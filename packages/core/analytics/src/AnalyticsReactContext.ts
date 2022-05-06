import React from 'react';

export interface AnalyticsReactContextInterface {
  getAnalyticsContext(): any[];
  getAnalyticsEventHandlers(): any[];
}

export const AnalyticsReactContext =
  React.createContext<AnalyticsReactContextInterface>({
    getAnalyticsContext: () => [],
    getAnalyticsEventHandlers: () => [],
  });
