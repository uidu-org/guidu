import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import ConnectedItem from '../ConnectedItem';
var gridSize = gridSizeFn();

var ArrowLeft = function ArrowLeft() {
  return React.createElement(ArrowLeftCircleIcon, {
    primaryColor: "currentColor",
    secondaryColor: "inherit"
  });
};

var BackItem =
/*#__PURE__*/
function (_Component) {
  _inherits(BackItem, _Component);

  function BackItem() {
    _classCallCheck(this, BackItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(BackItem).apply(this, arguments));
  }

  _createClass(BackItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          beforeProp = _this$props.before,
          text = _this$props.text,
          props = _objectWithoutProperties(_this$props, ["before", "text"]);

      var before = beforeProp;

      if (!before) {
        before = ArrowLeft;
      }

      return React.createElement("div", {
        css: {
          paddingBottom: gridSize * 2
        }
      }, React.createElement(ConnectedItem, _extends({}, props, {
        after: null,
        before: before,
        text: text
      })));
    }
  }]);

  return BackItem;
}(Component);

BackItem.defaultProps = {
  text: 'Back'
};
export { BackItem as default };