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

var SectionHeading =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SectionHeading, _Component);

  function SectionHeading() {
    (0, _classCallCheck2.default)(this, SectionHeading);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SectionHeading).apply(this, arguments));
  }

  (0, _createClass2.default)(SectionHeading, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement("div", {
        css: {
          alignItems: 'center',
          color: 'inherit',
          display: 'flex',
          flexShrink: 0,
          fontSize: 'inherit',
          fontWeight: 600,
          height: gridSize * 5.5,
          paddingLeft: gridSize * 1.5,
          paddingRight: gridSize * 1.5,
          paddingTop: gridSize
        }
      }, children);
    }
  }]);
  return SectionHeading;
}(_react.Component);

exports.default = SectionHeading;
module.exports = exports.default;