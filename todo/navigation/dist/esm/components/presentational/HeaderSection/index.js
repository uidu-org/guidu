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

var HeaderSection =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderSection, _Component);

  function HeaderSection() {
    _classCallCheck(this, HeaderSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeaderSection).apply(this, arguments));
  }

  _createClass(HeaderSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          id = _this$props.id,
          parentId = _this$props.parentId;
      return React.createElement(Section, {
        id: id,
        key: id,
        parentId: parentId
      }, function (_ref) {
        var css = _ref.css;

        var headerCss = _objectSpread({}, css, {
          paddingTop: gridSize * 2.5
        });

        return children({
          css: headerCss,
          className: parseCss(headerCss)
        });
      });
    }
  }]);

  return HeaderSection;
}(Component);

export { HeaderSection as default };