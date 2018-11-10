import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withContentTheme } from '../../../theme';

var GroupHeadingPrimitive = function GroupHeadingPrimitive(_ref) {
  var After = _ref.after,
      children = _ref.children,
      theme = _ref.theme;
  var mode = theme.mode,
      context = theme.context;
  var styles = mode.heading()[context];
  return React.createElement("div", {
    css: styles.headingBase
  }, React.createElement("div", {
    css: styles.textWrapper
  }, children), !!After && React.createElement("div", {
    css: styles.afterWrapper
  }, React.createElement(After, null)));
};

var GroupHeadingPrimitiveWithTheme = withContentTheme(GroupHeadingPrimitive);

var GroupHeading =
/*#__PURE__*/
function (_Component) {
  _inherits(GroupHeading, _Component);

  function GroupHeading() {
    _classCallCheck(this, GroupHeading);

    return _possibleConstructorReturn(this, _getPrototypeOf(GroupHeading).apply(this, arguments));
  }

  _createClass(GroupHeading, [{
    key: "render",
    value: function render() {
      return React.createElement(GroupHeadingPrimitiveWithTheme, this.props);
    }
  }]);

  return GroupHeading;
}(Component);

export { GroupHeading as default };