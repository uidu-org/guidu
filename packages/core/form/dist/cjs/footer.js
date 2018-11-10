"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormFooter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

function FormFooter(_ref) {
  var otherProps = (0, _extends2.default)({}, _ref);
  return _react.default.createElement("div", (0, _extends2.default)({}, otherProps, {
    className: "d-flex align-items-center justify-content-between"
  }));
}

module.exports = exports.default;