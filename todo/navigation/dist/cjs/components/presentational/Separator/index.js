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

var SeparatorWithTheme = (0, _theme.withContentTheme)(function (_ref) {
  var theme = _ref.theme;
  var mode = theme.mode,
      context = theme.context;
  var styles = mode.separator()[context];
  return _react.default.createElement("div", {
    css: styles
  });
});

var Separator =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Separator, _Component);

  function Separator() {
    (0, _classCallCheck2.default)(this, Separator);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Separator).apply(this, arguments));
  }

  (0, _createClass2.default)(Separator, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(SeparatorWithTheme, this.props);
    }
  }]);
  return Separator;
}(_react.Component);

exports.default = Separator;
module.exports = exports.default;