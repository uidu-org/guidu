import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { navigationItemClicked } from '../../../common/analytics';
import InteractionStateManager from '../InteractionStateManager';
import { styleReducerNoOp } from '../../../theme';
import ItemPrimitive from './primitives';

var Item =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Item, _PureComponent);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderItem = function (state) {
      return React.createElement(ItemPrimitive, _extends({}, state, _this.props));
    };

    return _this;
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      return React.createElement(InteractionStateManager, this.props, this.renderItem);
    }
  }]);

  return Item;
}(PureComponent);

Item.defaultProps = {
  styles: styleReducerNoOp,
  isSelected: false,
  spacing: 'default',
  text: ''
};
export { Item as ItemBase };
export default navigationItemClicked(Item, 'item');