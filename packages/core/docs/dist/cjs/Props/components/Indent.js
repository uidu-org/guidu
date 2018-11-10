"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Indent;

var _react = _interopRequireDefault(require("react"));

function Indent(props) {
  return _react.default.createElement("div", {
    style: {
      paddingLeft: '1.3em'
    }
  }, props.children);
}

module.exports = exports.default;