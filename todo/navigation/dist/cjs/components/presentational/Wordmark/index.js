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

var _theme = require("@atlaskit/theme");

var gridSize = (0, _theme.gridSize)();

var Wordmark =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Wordmark, _Component);

  function Wordmark() {
    (0, _classCallCheck2.default)(this, Wordmark);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Wordmark).apply(this, arguments));
  }

  (0, _createClass2.default)(Wordmark, [{
    key: "render",
    value: function render() {
      var WordmarkLogo = this.props.wordmark;
      return _react.default.createElement("div", {
        css: {
          lineHeight: 0,
          // -2px here to account for the extra space at the top of a MenuSection
          // for the scroll hint.
          paddingBottom: gridSize * 3.5 - 2,
          paddingLeft: gridSize * 2,
          paddingTop: gridSize
        }
      }, _react.default.createElement(WordmarkLogo, null));
    }
  }]);
  return Wordmark;
}(_react.Component);

exports.default = Wordmark;
module.exports = exports.default;