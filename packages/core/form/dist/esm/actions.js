import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
export default function FormActions(_ref) {
  var className = _ref.className,
      otherProps = _objectWithoutProperties(_ref, ["className"]);

  return React.createElement("div", _extends({}, otherProps, {
    className: className
  }));
}
FormActions.defaultProps = {
  className: null
};
FormActions.propTypes = {
  className: PropTypes.string
};