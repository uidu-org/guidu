import * as React from 'react';
import GoogleAnalyticsListener from './GoogleAnalyticsListener';

const AnalyticsListeners = ({ children }) => {
  return <GoogleAnalyticsListener>{children}</GoogleAnalyticsListener>;
};

export default AnalyticsListeners;
