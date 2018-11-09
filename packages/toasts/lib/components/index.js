"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNotification = require("react-notification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyleFactory = function defaultStyleFactory(index) {
  return Object.assign({}, {
    fontFamily: 'inherit'
  }, {
    bottom: "".concat(2 + index * 4, "rem")
  });
};

var Toasts = function Toasts(_ref) {
  var toasts = _ref.toasts,
      removeToast = _ref.removeToast;
  return _react.default.createElement(_reactNotification.NotificationStack, {
    dismissAfter: 3000,
    notifications: toasts,
    onDismiss: function onDismiss(_ref2) {
      var key = _ref2.key;
      return removeToast(key);
    },
    barStyleFactory: defaultStyleFactory,
    activeBarStyleFactory: defaultStyleFactory
  });
};

var _default = Toasts;
exports.default = _default;
Toasts.propTypes = {
  toasts: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired
  })).isRequired,
  removeToast: _propTypes.default.func.isRequired
};
module.exports = exports.default;