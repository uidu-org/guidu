"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _avatar = _interopRequireDefault(require("@atlaskit/avatar"));

var _theme = require("../../../theme");

var ItemAvatar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ItemAvatar, _Component);

  function ItemAvatar() {
    (0, _classCallCheck2.default)(this, ItemAvatar);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ItemAvatar).apply(this, arguments));
  }

  (0, _createClass2.default)(ItemAvatar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itemState = _this$props.itemState,
          styleReducer = _this$props.styles,
          theme = _this$props.theme,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["itemState", "styles", "theme"]);
      var mode = theme.mode,
          context = theme.context;
      var borderColor = styleReducer(mode.item(itemState)[context], itemState).itemBase.backgroundColor;
      return _react.default.createElement(_avatar.default, (0, _extends2.default)({
        borderColor: borderColor
      }, props));
    }
  }]);
  return ItemAvatar;
}(_react.Component);

var _default = (0, _theme.withContentTheme)(ItemAvatar);

exports.default = _default;
module.exports = exports.default;