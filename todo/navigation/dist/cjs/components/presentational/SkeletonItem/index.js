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

var _emotion = require("emotion");

var _theme = require("../../../theme");

var SkeletonItem =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(SkeletonItem, _PureComponent);

  function SkeletonItem() {
    (0, _classCallCheck2.default)(this, SkeletonItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SkeletonItem).apply(this, arguments));
  }

  (0, _createClass2.default)(SkeletonItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hasBefore = _this$props.hasBefore,
          styleReducer = _this$props.styles,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var defaultStyles = mode.skeletonItem()[context];
      var styles = styleReducer(defaultStyles);
      return _react.default.createElement("div", {
        className: (0, _emotion.css)({
          '&&': styles.wrapper
        })
      }, hasBefore && _react.default.createElement("div", {
        css: styles.before
      }), _react.default.createElement("div", {
        css: styles.content
      }));
    }
  }]);
  return SkeletonItem;
}(_react.PureComponent);

SkeletonItem.defaultProps = {
  hasBefore: false,
  styles: _theme.styleReducerNoOp
};

var _default = (0, _theme.withContentTheme)(SkeletonItem);

exports.default = _default;
module.exports = exports.default;