"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HomeCircleIcon = function HomeCircleIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><g fill-rule=\"evenodd\"><path d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z\" fill=\"currentColor\"/><path d=\"M11.643 6.357a.506.506 0 0 1 .714 0l4.931 4.931c.393.393.256.712-.29.712H7.002c-.553 0-.68-.323-.29-.712l4.93-4.93z\" fill=\"inherit\"/><path d=\"M8 12.003c0-.554.453-1.003.997-1.003h6.006c.55 0 .997.438.997 1.003v4.994c0 .554-.453 1.003-.997 1.003H8.997A.993.993 0 0 1 8 16.997v-4.994zm2.667 3.514V18h2.666v-2.483a1.334 1.334 0 1 0-2.666 0z\" fill=\"inherit\"/></g></svg>"
  }, props));
};

HomeCircleIcon.displayName = 'HomeCircleIcon';
var _default = HomeCircleIcon;
exports.default = _default;