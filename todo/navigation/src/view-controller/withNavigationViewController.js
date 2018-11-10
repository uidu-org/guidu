// @flow

import React, { type ComponentType } from 'react';
import ViewControllerSubscriber from './ViewControllerSubscriber';

export default (WrappedComponent: ComponentType<*>) => {
  const WithNavigationViewController = (props: *) => (
    <ViewControllerSubscriber>
      {navigationViewController => (
        <WrappedComponent
          navigationViewController={navigationViewController}
          {...props}
        />
      )}
    </ViewControllerSubscriber>
  );

  WithNavigationViewController.displayName = `WithNavigationViewController(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNavigationViewController;
};
