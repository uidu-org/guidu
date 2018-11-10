"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormMeta;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function FormMeta(_ref) {
  var className = _ref.className,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["className"]);
  return _react.default.createElement("div", (0, _extends2.default)({}, otherProps, {
    className: (0, _classnames.default)('form-meta', className)
  }));
}

FormMeta.defaultProps = {
  className: null
};
FormMeta.propTypes = {
  className: _propTypes.default.string
};
module.exports = exports.default;