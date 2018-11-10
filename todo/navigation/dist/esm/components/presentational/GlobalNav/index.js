import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

/**
 * NOTE: This GlobalNavigation is the layout primitive, which will be wrapped by
 * the more opinionated @atlaskit/global-navigation component.
 */
import React, { Component } from 'react';
import GlobalItem from '../GlobalItem';
import { withGlobalTheme } from '../../../theme';
import GlobalNavigation from './GlobalNavigation';
var GlobalNavigationWithTheme = withGlobalTheme(GlobalNavigation);

var ConnectedGlobalNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(ConnectedGlobalNavigation, _Component);

  function ConnectedGlobalNavigation() {
    _classCallCheck(this, ConnectedGlobalNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectedGlobalNavigation).apply(this, arguments));
  }

  _createClass(ConnectedGlobalNavigation, [{
    key: "render",
    value: function render() {
      return React.createElement(GlobalNavigationWithTheme, this.props);
    }
  }]);

  return ConnectedGlobalNavigation;
}(Component);

ConnectedGlobalNavigation.defaultProps = {
  itemComponent: GlobalItem
};
export { ConnectedGlobalNavigation as default };