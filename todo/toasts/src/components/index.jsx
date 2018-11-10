import React from 'react';
import PropTypes from 'prop-types';
import { NotificationStack } from 'react-notification';

const defaultStyleFactory = index =>
  Object.assign(
    {},
    { fontFamily: 'inherit' },
    { bottom: `${2 + index * 4}rem` },
  );

const Toasts = ({ toasts, removeToast }) => (
  <NotificationStack
    dismissAfter={3000}
    notifications={toasts}
    onDismiss={({ key }) => removeToast(key)}
    barStyleFactory={defaultStyleFactory}
    activeBarStyleFactory={defaultStyleFactory}
  />
);

export default Toasts;

Toasts.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeToast: PropTypes.func.isRequired,
};
