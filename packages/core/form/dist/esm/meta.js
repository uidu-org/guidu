import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default function FormMeta(_ref) {
  var className = _ref.className,
      otherProps = _objectWithoutProperties(_ref, ["className"]);

  return React.createElement("div", _extends({}, otherProps, {
    className: classNames('form-meta', className)
  }));
}
FormMeta.defaultProps = {
  className: null
};
FormMeta.propTypes = {
  className: PropTypes.string
};