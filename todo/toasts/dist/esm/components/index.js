import React from 'react';
import PropTypes from 'prop-types';
import { NotificationStack } from 'react-notification';

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
  return React.createElement(NotificationStack, {
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

export default Toasts;
Toasts.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired
  })).isRequired,
  removeToast: PropTypes.func.isRequired
};