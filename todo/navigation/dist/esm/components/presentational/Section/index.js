import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { styleReducerNoOp, withContentTheme } from '../../../theme';
import SectionBase from './Section';
var SectionWithTheme = withContentTheme(SectionBase);

var Section =
/*#__PURE__*/
function (_Component) {
  _inherits(Section, _Component);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, _getPrototypeOf(Section).apply(this, arguments));
  }

  _createClass(Section, [{
    key: "render",
    value: function render() {
      return React.createElement(SectionWithTheme, this.props);
    }
  }]);

  return Section;
}(Component);

Section.defaultProps = {
  alwaysShowScrollHint: false,
  shouldGrow: false,
  styles: styleReducerNoOp
};
export { Section as default };