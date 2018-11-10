"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shadow = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

var Shadow = function Shadow(_ref) {
  var direction = _ref.direction,
      isBold = _ref.isBold,
      isOverDarkBg = _ref.isOverDarkBg,
      props = (0, _objectWithoutProperties2.default)(_ref, ["direction", "isBold", "isOverDarkBg"]);
  var width = isOverDarkBg ? 6 : 3;
  if (isBold) width = isOverDarkBg ? 12 : 6;
  var colorStops = "\n    rgba(0, 0, 0, 0.2) 0px,\n    rgba(0, 0, 0, 0.2) 1px,\n    rgba(0, 0, 0, 0.1) 1px,\n    rgba(0, 0, 0, 0) 100%\n  ";
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      background: "linear-gradient(".concat(direction, ", ").concat(colorStops, ")"),
      bottom: 0,
      left: direction === 'to left' ? -width : -1,
      opacity: isBold ? 1 : 0.5,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transitionDuration: _constants.transitionDuration,
      transitionProperty: 'left, opacity, width',
      transitionTimingFunction: _constants.transitionTimingFunction,
      width: width
    }
  }, props));
};

exports.Shadow = Shadow;
Shadow.defaultProps = {
  direction: 'to left'
};