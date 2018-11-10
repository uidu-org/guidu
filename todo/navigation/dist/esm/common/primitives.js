import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { transitionTimingFunction, transitionDuration } from './constants';
export var Shadow = function Shadow(_ref) {
  var direction = _ref.direction,
      isBold = _ref.isBold,
      isOverDarkBg = _ref.isOverDarkBg,
      props = _objectWithoutProperties(_ref, ["direction", "isBold", "isOverDarkBg"]);

  var width = isOverDarkBg ? 6 : 3;
  if (isBold) width = isOverDarkBg ? 12 : 6;
  var colorStops = "\n    rgba(0, 0, 0, 0.2) 0px,\n    rgba(0, 0, 0, 0.2) 1px,\n    rgba(0, 0, 0, 0.1) 1px,\n    rgba(0, 0, 0, 0) 100%\n  ";
  return React.createElement("div", _extends({
    css: {
      background: "linear-gradient(".concat(direction, ", ").concat(colorStops, ")"),
      bottom: 0,
      left: direction === 'to left' ? -width : -1,
      opacity: isBold ? 1 : 0.5,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transitionDuration: transitionDuration,
      transitionProperty: 'left, opacity, width',
      transitionTimingFunction: transitionTimingFunction,
      width: width
    }
  }, props));
};
Shadow.defaultProps = {
  direction: 'to left'
};