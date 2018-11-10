"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReadmeDescription;

var _react = _interopRequireDefault(require("react"));

function ReadmeDescription(_ref) {
  var children = _ref.children;
  var style = {
    marginTop: 12
  };
  return typeof children === 'string' ? _react.default.createElement("p", null, children) : _react.default.createElement("div", {
    style: style
  }, children);
}

module.exports = exports.default;