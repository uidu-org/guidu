"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("../../../theme");

/**
 * @deprecated: This component is deprecated and will be removed in a future
 * release. Use the shouldGrow prop on a Section to achieve this functionality.
 */
var ScrollableSectionInner =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ScrollableSectionInner, _Component);

  function ScrollableSectionInner() {
    (0, _classCallCheck2.default)(this, ScrollableSectionInner);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScrollableSectionInner).apply(this, arguments));
  }

  (0, _createClass2.default)(ScrollableSectionInner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          styleReducer = _this$props.styles,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var styles = styleReducer(mode.scrollHint()[context]);
      return _react.default.createElement("div", {
        css: styles.wrapper
      }, _react.default.createElement("div", {
        css: styles.inner
      }, children));
    }
  }]);
  return ScrollableSectionInner;
}(_react.Component);

ScrollableSectionInner.defaultProps = {
  styles: _theme.styleReducerNoOp
};

var _default = (0, _theme.withContentTheme)(ScrollableSectionInner);

exports.default = _default;
module.exports = exports.default;