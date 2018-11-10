"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = require("react");

/**
 * This component blocks render unless any non-children props change via shallow comparison.
 *
 * Alternatively if `blockOnChange` is set, render will only be blocked when another non-children prop changes.
 * For example, if you know you do not want to re-render when a certain prop changes (use with care).
 */
var RenderBlocker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RenderBlocker, _Component);

  function RenderBlocker() {
    (0, _classCallCheck2.default)(this, RenderBlocker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RenderBlocker).apply(this, arguments));
  }

  (0, _createClass2.default)(RenderBlocker, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(prevProps) {
      var _this$props = this.props,
          blockOnChange = _this$props.blockOnChange,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["blockOnChange", "children"]);
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
}(_react.Component);

exports.default = RenderBlocker;
RenderBlocker.defaultProps = {
  blockOnChange: false
};
module.exports = exports.default;