import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { PureComponent } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import Item from '../Item';
import { styleReducerNoOp } from '../../../theme';
var gridSize = gridSizeFn();

var modifyStyles = function modifyStyles(defaultStyles) {
  return _objectSpread({}, defaultStyles, {
    itemBase: _objectSpread({}, defaultStyles.itemBase, {
      height: gridSize * 6,
      paddingBottom: 0,
      paddingLeft: gridSize / 2 - 2,
      // Offset by 2px to account for border of avatar
      paddingRight: gridSize / 2,
      paddingTop: 0
    }),
    beforeWrapper: _objectSpread({}, defaultStyles.beforeWrapper, {
      marginRight: gridSize - 2 // Offset by 2px to account for border of avatar

    }),
    afterWrapper: _objectSpread({}, defaultStyles.afterWrapper, {
      marginLeft: gridSize
    }),
    textWrapper: _objectSpread({}, defaultStyles.textWrapper, {
      fontWeight: 600
    })
  });
};

var ContainerHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerHeader, _PureComponent);

  function ContainerHeader() {
    _classCallCheck(this, ContainerHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContainerHeader).apply(this, arguments));
  }

  _createClass(ContainerHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styleReducer = _this$props.styles,
          props = _objectWithoutProperties(_this$props, ["styles"]); // We modify the Item styles ourselves, then allow the consumer to modify
      // these if they want to.


      var patchedStyles = function patchedStyles(defaultStyles, state) {
        return styleReducer(modifyStyles(defaultStyles), state);
      };

      return React.createElement(Item, _extends({}, props, {
        styles: patchedStyles,
        spacing: "default"
      }));
    }
  }]);

  return ContainerHeader;
}(PureComponent);

ContainerHeader.defaultProps = {
  styles: styleReducerNoOp,
  isSelected: false,
  text: ''
};
export { ContainerHeader as default };