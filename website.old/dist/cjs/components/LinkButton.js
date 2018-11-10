"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LinkButton;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _WrappedLink = require("./WrappedLink");

var _button = _interopRequireDefault(require("@atlaskit/button"));

function LinkButton(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return _react.default.createElement(_button.default, {
    component: function component(props) {
      return _react.default.createElement(_WrappedLink.Link, (0, _extends2.default)({
        to: to
      }, props), children);
    }
  });
}

module.exports = exports.default;