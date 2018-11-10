import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withContentTheme } from '../../../theme';
var SeparatorWithTheme = withContentTheme(function (_ref) {
  var theme = _ref.theme;
  var mode = theme.mode,
      context = theme.context;
  var styles = mode.separator()[context];
  return React.createElement("div", {
    css: styles
  });
});

var Separator =
/*#__PURE__*/
function (_Component) {
  _inherits(Separator, _Component);

  function Separator() {
    _classCallCheck(this, Separator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Separator).apply(this, arguments));
  }

  _createClass(Separator, [{
    key: "render",
    value: function render() {
      return React.createElement(SeparatorWithTheme, this.props);
    }
  }]);

  return Separator;
}(Component);

export { Separator as default };