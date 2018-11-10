import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

/**
 * @deprecated: This component is deprecated and will be removed in a future
 * release. Use the shouldGrow prop on a Section to achieve this functionality.
 */
import React, { Component } from 'react';
import { styleReducerNoOp, withContentTheme } from '../../../theme';

var ScrollableSectionInner =
/*#__PURE__*/
function (_Component) {
  _inherits(ScrollableSectionInner, _Component);

  function ScrollableSectionInner() {
    _classCallCheck(this, ScrollableSectionInner);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollableSectionInner).apply(this, arguments));
  }

  _createClass(ScrollableSectionInner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          styleReducer = _this$props.styles,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var styles = styleReducer(mode.scrollHint()[context]);
      return React.createElement("div", {
        css: styles.wrapper
      }, React.createElement("div", {
        css: styles.inner
      }, children));
    }
  }]);

  return ScrollableSectionInner;
}(Component);

ScrollableSectionInner.defaultProps = {
  styles: styleReducerNoOp
};
export default withContentTheme(ScrollableSectionInner);