"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormDestroy;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function FormDestroy(_ref) {
  var className = _ref.className,
      onDestroy = _ref.onDestroy,
      object = _ref.object,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["className", "onDestroy", "object"]);

  var destroy = function destroy(e) {
    e.preventDefault();

    if (confirm(window.I18n.t('utils.alerts.destroy'))) {
      onDestroy(object);
    }
  };

  return _react.default.createElement("a", {
    href: "#",
    className: className,
    onClick: destroy
  }, I18n.t('utils.actions.destroy'));
}

module.exports = exports.default;