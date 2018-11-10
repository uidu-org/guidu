import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();

var Wordmark =
/*#__PURE__*/
function (_Component) {
  _inherits(Wordmark, _Component);

  function Wordmark() {
    _classCallCheck(this, Wordmark);

    return _possibleConstructorReturn(this, _getPrototypeOf(Wordmark).apply(this, arguments));
  }

  _createClass(Wordmark, [{
    key: "render",
    value: function render() {
      var WordmarkLogo = this.props.wordmark;
      return React.createElement("div", {
        css: {
          lineHeight: 0,
          // -2px here to account for the extra space at the top of a MenuSection
          // for the scroll hint.
          paddingBottom: gridSize * 3.5 - 2,
          paddingLeft: gridSize * 2,
          paddingTop: gridSize
        }
      }, React.createElement(WordmarkLogo, null));
    }
  }]);

  return Wordmark;
}(Component);

export { Wordmark as default };