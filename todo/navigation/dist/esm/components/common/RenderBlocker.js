import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { Component } from 'react';

/**
 * This component blocks render unless any non-children props change via shallow comparison.
 *
 * Alternatively if `blockOnChange` is set, render will only be blocked when another non-children prop changes.
 * For example, if you know you do not want to re-render when a certain prop changes (use with care).
 */
var RenderBlocker =
/*#__PURE__*/
function (_Component) {
  _inherits(RenderBlocker, _Component);

  function RenderBlocker() {
    _classCallCheck(this, RenderBlocker);

    return _possibleConstructorReturn(this, _getPrototypeOf(RenderBlocker).apply(this, arguments));
  }

  _createClass(RenderBlocker, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(prevProps) {
      var _this$props = this.props,
          blockOnChange = _this$props.blockOnChange,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["blockOnChange", "children"]);

      var propsChanged = Object.keys(props).some(function (propName) {
        return props[propName] !== prevProps[propName];
      });
      return this.props.blockOnChange ? !propsChanged : propsChanged;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return RenderBlocker;
}(Component);

RenderBlocker.defaultProps = {
  blockOnChange: false
};
export { RenderBlocker as default };