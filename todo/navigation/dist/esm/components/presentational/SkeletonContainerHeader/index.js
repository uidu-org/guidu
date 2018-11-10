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
import SkeletonItem from '../SkeletonItem';
import { styleReducerNoOp } from '../../../theme';
var gridSize = gridSizeFn();

var modifyStyles = function modifyStyles(defaultStyles) {
  return _objectSpread({}, defaultStyles, {
    wrapper: _objectSpread({}, defaultStyles.wrapper, {
      height: "".concat(gridSize * 6, "px"),
      paddingLeft: gridSize / 2,
      paddingRight: gridSize / 2
    }),
    before: _objectSpread({}, defaultStyles.before, {
      borderRadius: 3,
      height: gridSize * 5,
      marginRight: gridSize,
      width: gridSize * 5
    })
  });
};

var SkeletonContainerHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SkeletonContainerHeader, _PureComponent);

  function SkeletonContainerHeader() {
    _classCallCheck(this, SkeletonContainerHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerHeader).apply(this, arguments));
  }

  _createClass(SkeletonContainerHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styleReducer = _this$props.styles,
          props = _objectWithoutProperties(_this$props, ["styles"]); // We modify the SkeletonItem styles ourselves, then allow the consumer to
      // modify these if they want to.


      var patchedStyles = function patchedStyles(defaultStyles) {
        return styleReducer(modifyStyles(defaultStyles));
      };

      return React.createElement(SkeletonItem, _extends({}, props, {
        styles: patchedStyles,
        spacing: "default"
      }));
    }
  }]);

  return SkeletonContainerHeader;
}(PureComponent);

SkeletonContainerHeader.defaultProps = {
  hasBefore: false,
  styles: styleReducerNoOp
};
export { SkeletonContainerHeader as default };