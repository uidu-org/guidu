"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HomeFilledIcon = function HomeFilledIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M18 12v8.004c0 .55-.456.996-1.002.996H7.002A.998.998 0 0 1 6 20.004V12H3.993c-.548 0-.673-.32-.287-.706l7.941-7.941a.497.497 0 0 1 .706 0l7.94 7.94c.39.39.262.707-.286.707H18zm-8 4.998V21h4v-4.002a2 2 0 0 0-4 0z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg>"
  }, props));
};

HomeFilledIcon.displayName = 'HomeFilledIcon';
var _default = HomeFilledIcon;
exports.default = _default;