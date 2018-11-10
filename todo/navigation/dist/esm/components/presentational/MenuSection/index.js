import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { css as parseCss } from 'emotion';
import Section from '../Section';
var gridSize = gridSizeFn();

var MenuSection =
/*#__PURE__*/
function (_Component) {
  _inherits(MenuSection, _Component);

  function MenuSection() {
    _classCallCheck(this, MenuSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuSection).apply(this, arguments));
  }

  _createClass(MenuSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alwaysShowScrollHint = _this$props.alwaysShowScrollHint,
          id = _this$props.id,
          children = _this$props.children,
          parentId = _this$props.parentId;
      return React.createElement(Section, {
        id: id,
        parentId: parentId,
        alwaysShowScrollHint: alwaysShowScrollHint,
        shouldGrow: true
      }, function (_ref) {
        var css = _ref.css;

        var menuCss = _objectSpread({}, css, {
          paddingBottom: gridSize * 1.5
        });

        return children({
          css: menuCss,
          className: parseCss(menuCss)
        });
      });
    }
  }]);

  return MenuSection;
}(Component);

MenuSection.defaultProps = {
  alwaysShowScrollHint: false
};
export { MenuSection as default };