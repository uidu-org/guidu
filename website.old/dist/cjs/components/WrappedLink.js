"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactRouterDom = require("react-router-dom");

var _react = _interopRequireDefault(require("react"));

var Link = function Link(_ref) {
  var _onClick = _ref.onClick,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["onClick"]);
  return _react.default.createElement(_reactRouterDom.Link, (0, _extends2.default)({
    onClick: function onClick(e) {
      if (performance.mark) {
        performance.clearMarks();
        performance.mark("navigate-".concat(rest.to));
      }

      if (_onClick) _onClick(e);
    }
  }, rest));
}; // exporting like this so it's just replace react-router-dom w/ thisFilePath


exports.Link = Link;