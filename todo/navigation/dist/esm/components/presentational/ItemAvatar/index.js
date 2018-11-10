import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { styleReducerNoOp, withContentTheme } from '../../../theme';
import ItemAvatar from './ItemAvatar';
var ItemAvatarWithTheme = withContentTheme(ItemAvatar);

var ConnectedItemAvatar =
/*#__PURE__*/
function (_Component) {
  _inherits(ConnectedItemAvatar, _Component);

  function ConnectedItemAvatar() {
    _classCallCheck(this, ConnectedItemAvatar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectedItemAvatar).apply(this, arguments));
  }

  _createClass(ConnectedItemAvatar, [{
    key: "render",
    value: function render() {
      return React.createElement(ItemAvatarWithTheme, this.props);
    }
  }]);

  return ConnectedItemAvatar;
}(Component);

ConnectedItemAvatar.defaultProps = {
  styles: styleReducerNoOp
};
export { ConnectedItemAvatar as default };