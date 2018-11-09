// @flow

import React, { type ComponentType } from 'react';
import UIControllerSubscriber from './UIControllerSubscriber';

export default (WrappedComponent: ComponentType<*>) => {
  const WithNavigationUI = (props: *) => (
    <UIControllerSubscriber>
      {navigationUIController => (
        <WrappedComponent
          navigationUIController={navigationUIController}
          {...props}
        />
      )}
    </UIControllerSubscriber>
  );

  WithNavigationUI.displayName = `WithNavigationUI(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNavigationUI;
};
