import React from 'react';

export interface AnalyticsReactContextInterface {
  getGuiduAnalyticsContext(): any[];
  getGuidulyticsEventHandlers(): any[];
}

export const AnalyticsReactContext = React.createContext<
  AnalyticsReactContextInterface
>({
  getGuiduAnalyticsContext: () => [],
  getGuidulyticsEventHandlers: () => [],
});
