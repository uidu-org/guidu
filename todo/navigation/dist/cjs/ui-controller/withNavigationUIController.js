"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _UIControllerSubscriber = _interopRequireDefault(require("./UIControllerSubscriber"));

var _default = function _default(WrappedComponent) {
  var WithNavigationUI = function WithNavigationUI(props) {
    return _react.default.createElement(_UIControllerSubscriber.default, null, function (navigationUIController) {
      return _react.default.createElement(WrappedComponent, (0, _extends2.default)({
        navigationUIController: navigationUIController
      }, props));
    });
  };

  WithNavigationUI.displayName = "WithNavigationUI(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
  return WithNavigationUI;
};

exports.default = _default;
module.exports = exports.default;