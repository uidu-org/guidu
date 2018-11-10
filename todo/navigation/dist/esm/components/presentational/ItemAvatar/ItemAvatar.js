import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import Avatar from '@atlaskit/avatar';
import { withContentTheme } from '../../../theme';

var ItemAvatar =
/*#__PURE__*/
function (_Component) {
  _inherits(ItemAvatar, _Component);

  function ItemAvatar() {
    _classCallCheck(this, ItemAvatar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemAvatar).apply(this, arguments));
  }

  _createClass(ItemAvatar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itemState = _this$props.itemState,
          styleReducer = _this$props.styles,
          theme = _this$props.theme,
          props = _objectWithoutProperties(_this$props, ["itemState", "styles", "theme"]);

      var mode = theme.mode,
          context = theme.context;
      var borderColor = styleReducer(mode.item(itemState)[context], itemState).itemBase.backgroundColor;
      return React.createElement(Avatar, _extends({
        borderColor: borderColor
      }, props));
    }
  }]);

  return ItemAvatar;
}(Component);

export default withContentTheme(ItemAvatar);