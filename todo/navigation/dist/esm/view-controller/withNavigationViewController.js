import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import ViewControllerSubscriber from './ViewControllerSubscriber';
export default (function (WrappedComponent) {
  var WithNavigationViewController = function WithNavigationViewController(props) {
    return React.createElement(ViewControllerSubscriber, null, function (navigationViewController) {
      return React.createElement(WrappedComponent, _extends({
        navigationViewController: navigationViewController
      }, props));
    });
  };

  WithNavigationViewController.displayName = "WithNavigationViewController(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
  return WithNavigationViewController;
});