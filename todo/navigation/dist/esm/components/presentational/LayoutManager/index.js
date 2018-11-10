import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withNavigationUI } from '../../../ui-controller';
import LayoutManager from './LayoutManager';
var LayoutManagerWithNavigationUI = withNavigationUI(LayoutManager);

var ConnectedLayoutManager =
/*#__PURE__*/
function (_Component) {
  _inherits(ConnectedLayoutManager, _Component);

  function ConnectedLayoutManager() {
    _classCallCheck(this, ConnectedLayoutManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectedLayoutManager).apply(this, arguments));
  }

  _createClass(ConnectedLayoutManager, [{
    key: "render",
    value: function render() {
      return React.createElement(LayoutManagerWithNavigationUI, this.props);
    }
  }]);

  return ConnectedLayoutManager;
}(Component);

export { ConnectedLayoutManager as default };