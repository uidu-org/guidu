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

var GroupHeadingPrimitive = function GroupHeadingPrimitive(_ref) {
  var After = _ref.after,
      children = _ref.children,
      theme = _ref.theme;
  var mode = theme.mode,
      context = theme.context;
  var styles = mode.heading()[context];
  return _react.default.createElement("div", {
    css: styles.headingBase
  }, _react.default.createElement("div", {
    css: styles.textWrapper
  }, children), !!After && _react.default.createElement("div", {
    css: styles.afterWrapper
  }, _react.default.createElement(After, null)));
};

var GroupHeadingPrimitiveWithTheme = (0, _theme.withContentTheme)(GroupHeadingPrimitive);

var GroupHeading =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GroupHeading, _Component);

  function GroupHeading() {
    (0, _classCallCheck2.default)(this, GroupHeading);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GroupHeading).apply(this, arguments));
  }

  (0, _createClass2.default)(GroupHeading, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(GroupHeadingPrimitiveWithTheme, this.props);
    }
  }]);
  return GroupHeading;
}(_react.Component);

exports.default = GroupHeading;
module.exports = exports.default;